import axios from 'axios';

export const fetchDataFromVAPI = async () => {
  try {
    const response = await axios.post(
      'https://api.vapi.ai/analytics',
      {
        queries: [
          {
            table: 'call',
            groupBy: ['type'],
            name: 'call_data',
            timeRange: {
              step: 'day',
              start: '2024-06-01T00:00:00Z',
              end: '2024-06-30T23:59:59Z',
              timezone: 'UTC'
            },
            operations: [
              {
                operation: 'sum',
                column: 'duration',
                alias: 'total_minutes'
              },
              {
                operation: 'count',
                column: 'id',
                alias: 'call_count'
              },
              {
                operation: 'avg',
                column: 'duration',
                alias: 'avg_call_duration'
              },
              {
                operation: 'sum',
                column: 'cost',
                alias: 'daily_spend'
              }
            ]
          }
        ]
      },
      {
        headers: {
          'accept': 'application/json',
          'Authorization': 'Bearer 431bb6dd-6ec1-401d-ae1f-baa3c09322d7',
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('API Response:', response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Error response:', error.response.data);
      console.error('Error status:', error.response.status);
      console.error('Error headers:', error.response.headers);
    } else if (error.request) {
      console.error('Error request:', error.request);
    } else {
      console.error('Error message:', error.message);
    }
    console.error('Error config:', error.config);
    return null;
  }
};
