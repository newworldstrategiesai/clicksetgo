import nextConnect from 'next-connect';
import multer from 'multer';
import csv from 'csv-parser';
import fs from 'fs';
import path from 'path';

const upload = multer({ dest: '/tmp' });

const handler = nextConnect();

handler.use(upload.single('file'));

handler.post(async (req, res) => {
  const contacts = [];
  const filePath = req.file.path;

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => contacts.push(data))
    .on('end', () => {
      // Save contacts to a JSON file or a database
      const contactsFilePath = path.join(process.cwd(), 'contacts.json');
      fs.writeFileSync(contactsFilePath, JSON.stringify(contacts, null, 2), 'utf-8');
      fs.unlinkSync(filePath); // Clean up the temporary file
      res.status(200).json({ message: 'Contacts uploaded successfully', contacts });
    })
    .on('error', (error) => {
      console.error('Error processing CSV file:', error);
      res.status(500).json({ error: 'Failed to process CSV file' });
    });
});

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};
