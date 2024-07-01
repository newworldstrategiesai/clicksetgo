import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const loadContacts = () => {
  const contactsFilePath = path.join(process.cwd(), 'contacts.json');
  try {
    const fileContents = fs.readFileSync(contactsFilePath, 'utf-8');
    console.log('Contacts file contents:', fileContents); // Log file contents
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error loading contacts:', error);
    return [];
  }
};

export default async function handler(req, res) {
  try {
    const contacts = loadContacts();
    console.log('Loaded contacts:', contacts); // Log loaded contacts
    res.status(200).json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error.message);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
}
