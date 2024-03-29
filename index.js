require("dotenv").config();
const { Storage } = require("@google-cloud/storage");
const { BigQuery } = require("@google-cloud/bigquery");
const functions = require("@google-cloud/functions-framework");
const { automationSchema, performanceSchema } = require("./TableSchema");

const storage = new Storage();
const bigquery = new BigQuery({
  projectId: process.env.PROJECT_ID,
  keyFilename: "./service_account.json",
});



functions.http("helloBigQuery", async (req, res) => {
  try {
    const folderName = req.query.foldername;
    const bucketName = process.env.GCP_BUCKET_NAME;
    const datasetName = process.env.BIGQUERY_DATASET;

    // Create BigQuery dataset if it does not exist
    await createDatasetIfNotExists(datasetName)

    // Constuct prefix based on the folderName
    const prefix =
      folderName === ""
        ? `${getCurrentTimeString()}/`
        : `${folderName.replace(/-/g, "/")}/`;

    // Read all parquet files in the current folder in the bucket
    const [files] = await storage.bucket(bucketName).getFiles({ prefix });

    for (i = 1; i < files.length; i++) {
      if (files[i].name.endsWith(".parquet")) {

        const tableName = files[i].name.includes("gaga_automation")
          ? "gaga_automation"
          : "gaga_performance";

        const tempTableName = `${tableName}_temp`;
        const tempTableSchema =
          tableName === "gaga_automation"
            ? automationSchema
            : performanceSchema;

        const tempTableRef = bigquery.dataset(datasetName).table(tempTableName);

        // Create a temporary table if it does not exists
        await createTableIfNotExists(tempTableRef, tempTableSchema);

        // Load the Parquet file data into bigquery temp table
        await loadParquetFileIntoBigQuery(files[i], tempTableRef);


        // Delete the rows where the specified column is null or irrelevant
        await deleteRowsWithNullOrIrrelevantColumns(datasetName, tempTableName);

        // Move all records from the temp table to the final table to be appended
        const finalTableRef = bigquery.dataset(datasetName).table(tableName);
        await createTableIfNotExists(finalTableRef, tempTableSchema);
        await appendDataFromTempTableToFinalTable(tableName, datasetName, tempTableName);

        console.log(`Data from temp table moved to final table`);
      }
    }
    res.send("Data transferred successfully");
  } catch (error) {
    console.log(error);
    res.send("Data transfer failed");
  }
});

async function createDatasetIfNotExists(datasetName) {
  const [dataset] = await bigquery.dataset(datasetName).get({ autoCreate: true });
  if (dataset.exists()) {
    console.log(`Dataset ${datasetName} already exists`);
  } else {
    console.log(`Dataset ${datasetName} created`);
  }
}

async function createTableIfNotExists(tableRef, schema) {
  const [table] = await tableRef.get({ autoCreate: true, schema });
  if (table.exists()) {
    console.log(`Table ${tableRef.id} already exists`);
  } else {
    console.log(`Table ${tableRef.id} created`);
  }
}

async function loadParquetFileIntoBigQuery(file, tableRef) {
  const [job] = await tableRef.load(file, { sourceFormat: "PARQUET", writeDisposition: "WRITE_TRUNCATE" });
  console.log(`Job ${job.id} completed: Loaded Parquet file ${file.name} into BigQuery table ${tableRef.id}`);
}

async function deleteRowsWithNullOrIrrelevantColumns(datasetName, tableName) {
  let deleteQuery;
  if (tableName.includes("gaga_automation")) {
    deleteQuery = `DELETE FROM ${datasetName}.${tableName} WHERE bid IS NULL`;
  } else {
    deleteQuery = `DELETE FROM ${datasetName}.${tableName} WHERE cost = 0 OR clicks IS NULL`;
  }
  await bigquery.query(deleteQuery);
  console.log(`Deleted rows from table ${tableName} where necessary`);
}

async function appendDataFromTempTableToFinalTable(tableName, datasetName, tempTableName) {
  const insertQuery = `INSERT INTO ${datasetName}.${tableName} SELECT * FROM ${datasetName}.${tempTableName}`;
  await bigquery.query(insertQuery);
  console.log(`Data appended from temp table to final table`);
}

// Get the folder structure from the current date
function getCurrentTimeString() {
  // Get current date and time
  const currentDate = new Date();

  // Extract month, day, and hour components
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  const hour = currentDate.getHours() - 1;

  // Format the components into the desired string format
  const timeString = `${month}/${day}/${hour}`;

  return timeString;
}