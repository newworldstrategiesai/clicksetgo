import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export default async function handler(req, res) {
    const db = await open({
        filename: './contacts.db',
        driver: sqlite3.Database
    });

    if (req.method === 'GET') {
        const conversations = await db.all("SELECT number FROM contacts");
        res.status(200).json({ conversations: conversations.map(row => row.number) });
    } else {
        res.status(405).end(); // Method Not Allowed
    }
}
