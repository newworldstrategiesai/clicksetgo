// pages/api/contacts.js

export default function handler(req, res) {
    const contacts = [
      { id: 1, firstName: "John", lastName: "Doe", number: "+1234567890", email: "john.doe@example.com", address: "123 Main St" },
      { id: 2, firstName: "Jane", lastName: "Smith", number: "+0987654321", email: "jane.smith@example.com", address: "456 Elm St" },
    ];
  
    res.status(200).json(contacts);
  }
  