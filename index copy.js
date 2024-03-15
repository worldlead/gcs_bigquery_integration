require("dotenv").config();
const { Storage } = require("@google-cloud/storage");
const { BigQuery } = require("@google-cloud/bigquery");
const { automationSchema, performanceSchema } = require("./TableSchema");
const functions = require("@google-cloud/functions-framework");

const storage = new Storage();
const bigquery = new BigQuery({
  projectId: process.env.PROJECT_ID,
  keyFilename: "./service_account.json",
});

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

functions.http("helloBigQuery", async (req, res) => {
  try {
    const folderName = req.query.foldername;
    const bucketName = process.env.GCP_BUCKET_NAME;
    const datasetName = process.env.BIGQUERY_DATASET;

    // Create BigQuery dataset if it does not exist
    const [datasetExistence] = await bigquery.dataset(datasetName).exists();
    if (!datasetExistence) {
      await bigquery.createDataset(datasetName, { location: "US" });
    }

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

        const tempTableName = files[i].name.includes("gaga_automation")
          ? "gaga_automation_temp"
          : "gaga_performance_temp";

        const tempTableSchema =
          tableName === "gaga_automation"
            ? automationSchema
            : performanceSchema;

        const tempTableRef = bigquery.dataset(datasetName).table(tempTableName);

        // Create a temporary table if it does not exists
        const [tableExistence] = await tempTableRef.exists();
        if (!tableExistence) {
          await tempTableRef.create({ schema: tempTableSchema });
          console.log("Temporary table created successfully");
        }

        // Load the Parquet file data into bigquery temp table
        const meatadata = {
          sourceFormat: "PARQUET",
          writeDisposition: "WRITE_TRUNCATE",
          location: "US",
        };

        const [job] = await bigquery
          .dataset(datasetName)
          .table(tempTableName)
          .load(storage.bucket(bucketName).file(files[i].name), meatadata);

        console.log(`Job ${job.id} completed.`);

        // Delete the rows where the specified column is null or irrelevant
        let deleteQuery;
        if (tempTableName.includes("gaga_automation")) {
          deleteQuery = `DELETE FROM ${datasetName}.${tempTableName} WHERE bid is NULL`;
        } else {
          deleteQuery = `DELETE FROM ${datasetName}.${tempTableName} WHERE cost=0 OR clicks IS NULL`;
        }
        await bigquery.query(deleteQuery);

        // Move all records from the temp table to the final table to be appended
        const finalTableRef = bigquery.dataset(datasetName).table(tableName);
        const [finalTableExistence] = await finalTableRef.exists();
        if (!finalTableExistence) {
          await finalTableRef.create({ schema: tempTableSchema });
          console.log("Final table created successfully");
        }

        const insertQuery = `INSERT INTO ${datasetName}.${tableName} SELECT * FROM ${datasetName}.${tempTableName}`;
        await bigquery.query(insertQuery);

        console.log(`Data from temp table moved to final table`);
      }
    }
    res.send("Data transferred successfully");
  } catch (error) {
    console.log(error);
    res.send("Data transfer failed");
  }
});
