import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export default async function handler(req, res) {
    const { number } = req.query;
    const db = await open({
        filename: './contacts.db',
        driver: sqlite3.Database
    });

    if (req.method === 'GET') {
        const contact = await db.get("SELECT id FROM contacts WHERE number = ?", [number]);

        if (!contact) {
            res.status(200).json({ messages: [] });
        } else {
            const messages = await db.all("SELECT message, from_admin, timestamp FROM messages WHERE contact_id = ?", [contact.id]);
            res.status(200).json({ messages });
        }
    } else {
        res.status(405).end(); // Method Not Allowed
    }
}
