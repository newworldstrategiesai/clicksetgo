import { supabase } from '../../utils/supabaseClient';

export default async function handler(req, res) {
  try {
    // Create messages table
    const { data: messagesData, error: messagesError } = await supabase.rpc('execute_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS messages (
          id SERIAL PRIMARY KEY,
          sid VARCHAR UNIQUE,
          date_created TIMESTAMP,
          date_sent TIMESTAMP,
          date_updated TIMESTAMP,
          "from" VARCHAR,
          "to" VARCHAR,
          body TEXT,
          status VARCHAR,
          num_segments INT,
          num_media INT,
          direction VARCHAR,
          api_version VARCHAR,
          price NUMERIC,
          price_unit VARCHAR,
          error_code VARCHAR,
          error_message TEXT,
          uri VARCHAR,
          subresource_uris JSONB
        );
      `,
    });

    if (messagesError) throw messagesError;

    // Create call_logs table
    const { data: callLogsData, error: callLogsError } = await supabase.rpc('execute_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS call_logs (
          id SERIAL PRIMARY KEY,
          call_sid VARCHAR UNIQUE,
          date_created TIMESTAMP,
          date_updated TIMESTAMP,
          start_time TIMESTAMP,
          end_time TIMESTAMP,
          duration INT,
          caller VARCHAR,
          receiver VARCHAR,
          status VARCHAR,
          direction VARCHAR,
          price NUMERIC,
          price_unit VARCHAR,
          recording_url VARCHAR,
          transcript TEXT,
          assistant_id VARCHAR,
          assistant_name VARCHAR
        );
      `,
    });

    if (callLogsError) throw callLogsError;

    res.status(200).json({ message: 'Tables created successfully.' });
  } catch (error) {
    console.error('Error creating tables:', error);
    res.status(500).json({ error: 'Failed to create tables' });
  }
}
