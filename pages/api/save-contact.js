import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const contactsFilePath = path.join(process.cwd(), 'contacts.json');

// Load contacts from the JSON file
const loadContacts = () => {
  try {
    const fileContents = fs.readFileSync(contactsFilePath, 'utf-8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error loading contacts:', error);
    return [];
  }
};

// Save contacts to the JSON file
const saveContacts = (contacts) => {
  fs.writeFileSync(contactsFilePath, JSON.stringify(contacts, null, 2), 'utf-8');
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { phoneNumber, firstName, lastName } = req.body;

    // Load existing contacts
    const contacts = loadContacts();

    // Check if the contact already exists
    const existingContact = contacts.find(contact => contact.phoneNumber === phoneNumber);

    if (existingContact) {
      // Update existing contact
      existingContact.firstName = firstName;
      existingContact.lastName = lastName;
    } else {
      // Add new contact
      contacts.push({ phoneNumber, firstName, lastName });
    }

    // Save contacts
    saveContacts(contacts);

    res.status(200).json({ message: 'Contact saved successfully' });
  } else {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }
}
