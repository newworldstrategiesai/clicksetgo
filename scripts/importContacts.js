const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const contactsFilePath = path.join(__dirname, '../public/contacts.csv');
const contactsJsonPath = path.join(__dirname, '../contacts.json');

const contacts = [];

fs.createReadStream(contactsFilePath)
  .pipe(csv())
  .on('data', (data) => {
    const contact = {
      firstName: data['First name'] || '',
      lastName: data['Last name'] || '',
      phoneNumber: data['Phone'] || data['Phone mobile'] || data['Phone main'] || data['Phone other'] || ''
    };
    if (contact.phoneNumber) {
      contacts.push(contact);
    }
  })
  .on('end', () => {
    fs.writeFileSync(contactsJsonPath, JSON.stringify(contacts, null, 2), 'utf-8');
    console.log('Contacts have been imported successfully.');
  })
  .on('error', (error) => {
    console.error('Error processing CSV file:', error);
  });
