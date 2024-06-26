// pages/api/contacts.js

export default function handler(req, res) {
  const contacts = [
    {
      id: 1,
      first_name: 'John',
      last_name: 'Doe',
      number: '123-456-7890',
      email: 'john.doe@example.com',
      address: '123 Main St, Anytown, USA',
    },
    {
      id: 2,
      first_name: 'Jane',
      last_name: 'Smith',
      number: '987-654-3210',
      email: 'jane.smith@example.com',
      address: '456 Elm St, Othertown, USA',
    },
    // Add more mock contacts as needed
  ];

  res.status(200).json(contacts);
}
