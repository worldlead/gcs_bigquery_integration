const automationSchema = [
    {
      "name": "ts",
      "mode": "NULLABLE",
      "type": "INTEGER"
      
      
    },
    {
      "name": "ad_account_id",
      "mode": "NULLABLE",
      "type": "STRING"
      
      
    },
    {
      "name": "campaign_id",
      "mode": "NULLABLE",
      "type": "STRING"
      
      
    },
    {
      "name": "campaign_name",
      "mode": "NULLABLE",
      "type": "STRING"
      
      
    },
    {
      "name": "adset_id",
      "mode": "NULLABLE",
      "type": "STRING"
      
      
    },
    {
      "name": "bid",
      "mode": "NULLABLE",
      "type": "FLOAT"
      
      
    },
    {
      "name": "budget",
      "mode": "NULLABLE",
      "type": "FLOAT"
      
      
    },
    {
      "name": "campaign_status",
      "mode": "NULLABLE",
      "type": "STRING"
      
      
    },
    {
      "name": "adset_status",
      "mode": "NULLABLE",
      "type": "STRING"
      
      
    },
    {
      "name": "action_type",
      "mode": "NULLABLE",
      "type": "STRING"
      
      
    },
    {
      "name": "action",
      "mode": "NULLABLE",
      "type": "STRING"
      
      
    },
    {
      "name": "value",
      "mode": "NULLABLE",
      "type": "STRING"
      
      
    },
    {
      "name": "new_value",
      "mode": "NULLABLE",
      "type": "STRING"
      
      
    },
    {
      "name": "rule_id",
      "mode": "NULLABLE",
      "type": "STRING"
      
      
    },
    {
      "name": "rule_name",
      "mode": "NULLABLE",
      "type": "STRING"
      
      
    },
    {
      "name": "filtered_rules_ids",
      "mode": "NULLABLE",
      "type": "STRING"
      
      
    },
    {
      "name": "action_status",
      "mode": "NULLABLE",
      "type": "STRING"
      
      
    },
    {
      "name": "platform",
      "mode": "NULLABLE",
      "type": "STRING"
      
      
    },
    {
      "name": "id",
      "mode": "NULLABLE",
      "type": "INTEGER"
      
      
    },
    {
      "name": "automation_level",
      "mode": "NULLABLE",
      "type": "STRING"
      
      
    },
    {
      "name": "ad_id",
      "mode": "NULLABLE",
      "type": "STRING"
      
      
    },
    {
      "name": "ad_status",
      "mode": "NULLABLE",
      "type": "STRING"
      
      
    },
    {
      "name": "company_id",
      "mode": "NULLABLE",
      "type": "INTEGER"
      
      
    },
    {
      "name": "monetization_group_id",
      "mode": "NULLABLE",
      "type": "INTEGER"
      
      
    },
    {
      "name": "account_status",
      "mode": "NULLABLE",
      "type": "STRING"
      
      
    },
    {
      "name": "roas_average_floor",
      "mode": "NULLABLE",
      "type": "INTEGER"
      
      
    },
    {
      "name": "job_request_id",
      "mode": "NULLABLE",
      "type": "STRING"
      
      
    },
    {
      "name": "campaign_update_message_id",
      "mode": "NULLABLE",
      "type": "STRING"
      
      
    },
    {
      "name": "campaign_update_receive_count",
      "mode": "NULLABLE",
      "type": "INTEGER"
      
      
    },
    {
      "name": "logger_service_message_id",
      "mode": "NULLABLE",
      "type": "STRING"
      
      
    },
    {
      "name": "campaign_update_sent_timestamp",
      "mode": "NULLABLE",
      "type": "INTEGER"
      
      
    },
    {
      "name": "campaign_update_receive_timestamp",
      "mode": "NULLABLE",
      "type": "INTEGER"
      
      
    },
    {
      "name": "api_updated_time",
      "mode": "NULLABLE",
      "type": "INTEGER"
      
      
    },
    {
      "name": "logger_service_sent_timestamp",
      "mode": "NULLABLE",
      "type": "INTEGER"
      
      
    },
    {
      "name": "logger_service_receive_timestamp",
      "mode": "NULLABLE",
      "type": "INTEGER"
      
      
    },
    {
      "name": "__index_level_0__",
      "mode": "NULLABLE",
      "type": "INTEGER"
      
      
    }
  ]

const performanceSchema = [
    {
      "name": "ts",
      "mode": "NULLABLE",
      "type": "INTEGER"
      
      
    },
    {
      "name": "last_updated",
      "mode": "NULLABLE",
      "type": "INTEGER"
      
      
    },
    {
      "name": "platform",
      "mode": "NULLABLE",
      "type": "STRING"
      
      
    },
    {
      "name": "adset_id",
      "mode": "NULLABLE",
      "type": "STRING"
      
      
    },
    {
      "name": "adset_name",
      "mode": "NULLABLE",
      "type": "STRING"
      
      
    },
    {
      "name": "adset_status",
      "mode": "NULLABLE",
      "type": "STRING"
      
      
    },
    {
      "name": "adset_start_time",
      "mode": "NULLABLE",
      "type": "INTEGER"
      
      
    },
    {
      "name": "campaign_id",
      "mode": "NULLABLE",
      "type": "STRING"
      
      
    },
    {
      "name": "campaign_name",
      "mode": "NULLABLE",
      "type": "STRING"
      
      
    },
    {
      "name": "campaign_status",
      "mode": "NULLABLE",
      "type": "STRING"
      
      
    },
    {
      "name": "campaign_start_time",
      "mode": "NULLABLE",
      "type": "INTEGER"
      
      
    },
    {
      "name": "ad_account_id",
      "mode": "NULLABLE",
      "type": "STRING"
      
      
    },
    {
      "name": "account_name",
      "mode": "NULLABLE",
      "type": "STRING"
      
      
    },
    {
      "name": "account_status",
      "mode": "NULLABLE",
      "type": "STRING"
      
      
    },
    {
      "name": "account_timezone",
      "mode": "NULLABLE",
      "type": "STRING"
      
      
    },
    {
      "name": "cost",
      "mode": "NULLABLE",
      "type": "FLOAT"
      
      
    },
    {
      "name": "adx_revenue",
      "mode": "NULLABLE",
      "type": "FLOAT"
      
      
    },
    {
      "name": "predicted_adx_revenue",
      "mode": "NULLABLE",
      "type": "FLOAT"
      
      
    },
    {
      "name": "prebid_revenue",
      "mode": "NULLABLE",
      "type": "FLOAT"
      
      
    },
    {
      "name": "prebid_adx_revenue",
      "mode": "NULLABLE",
      "type": "FLOAT"
      
      
    },
    {
      "name": "clicks",
      "mode": "NULLABLE",
      "type": "INTEGER"
      
      
    },
    {
      "name": "sessions",
      "mode": "NULLABLE",
      "type": "INTEGER"
      
      
    },
    {
      "name": "pages",
      "mode": "NULLABLE",
      "type": "INTEGER"
      
      
    },
    {
      "name": "sections",
      "mode": "NULLABLE",
      "type": "INTEGER"
      
      
    },
    {
      "name": "impressions",
      "mode": "NULLABLE",
      "type": "INTEGER"
      
      
    },
    {
      "name": "ads",
      "mode": "NULLABLE",
      "type": "INTEGER"
      
      
    },
    {
      "name": "revenue",
      "mode": "NULLABLE",
      "type": "FLOAT"
      
      
    },
    {
      "name": "active_sessions",
      "mode": "NULLABLE",
      "type": "INTEGER"
      
      
    },
    {
      "name": "account_timezone_offset_hours_utc",
      "mode": "NULLABLE",
      "type": "STRING"
      
      
    },
    {
      "name": "tw_paid_clicks",
      "mode": "NULLABLE",
      "type": "INTEGER"
      
      
    },
    {
      "name": "source",
      "mode": "NULLABLE",
      "type": "STRING"
      
      
    },
    {
      "name": "conversions",
      "mode": "NULLABLE",
      "type": "INTEGER"
      
      
    },
    {
      "name": "bid_strategy",
      "mode": "NULLABLE",
      "type": "STRING"
      
      
    },
    {
      "name": "bounced_sessions",
      "mode": "NULLABLE",
      "type": "INTEGER"
      
      
    },
    {
      "name": "reported_conversions",
      "mode": "NULLABLE",
      "type": "INTEGER"
      
      
    },
    {
      "name": "reactions",
      "mode": "NULLABLE",
      "type": "INTEGER"
      
      
    },
    {
      "name": "shares",
      "mode": "NULLABLE",
      "type": "INTEGER"
      
      
    },
    {
      "name": "comments",
      "mode": "NULLABLE",
      "type": "INTEGER"
      
      
    },
    {
      "name": "native_impressions",
      "mode": "NULLABLE",
      "type": "INTEGER"
      
      
    },
    {
      "name": "native_revenue",
      "mode": "NULLABLE",
      "type": "FLOAT"
      
      
    },
    {
      "name": "company_id",
      "mode": "NULLABLE",
      "type": "INTEGER"
      
      
    },
    {
      "name": "share_of_ios",
      "mode": "NULLABLE",
      "type": "INTEGER"
      
      
    },
    {
      "name": "share_of_android",
      "mode": "NULLABLE",
      "type": "INTEGER"
      
      
    },
    {
      "name": "viewable_impressions",
      "mode": "NULLABLE",
      "type": "INTEGER"
      
      
    },
    {
      "name": "__index_level_0__",
      "mode": "NULLABLE",
      "type": "INTEGER"
      
      
    }
  ]

module.exports = { automationSchema, performanceSchema }