import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const loadContacts = () => {
  const contactsFilePath = path.join(process.cwd(), 'contacts.json');
  try {
    const fileContents = fs.readFileSync(contactsFilePath, 'utf-8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error loading contacts:', error);
    return [];
  }
};

export default function handler(req, res) {
  const { id } = req.query;
  const contacts = loadContacts();
  const contact = contacts.find(contact => contact.phoneNumber === id);
  if (contact) {
    res.status(200).json(contact);
  } else {
    res.status(404).json({ error: 'Contact not found' });
  }
}
