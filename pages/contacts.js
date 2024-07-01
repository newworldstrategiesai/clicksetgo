import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

// Function to format phone numbers to the Twilio format
const formatPhoneNumber = (phoneNumber) => {
  // Remove non-numeric characters
  const cleaned = ('' + phoneNumber).replace(/\D/g, '');
  // Format to +1XXXXXXXXXX
  const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `+${match[1]}${match[2]}${match[3]}${match[4]}`;
  }
  return null;
};

const Contacts = () => {
  const router = useRouter();
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredContacts, setFilteredContacts] = useState([]);

  useEffect(() => {
    // Fetch contacts from the server
    fetch('/api/get-contacts')
      .then((response) => response.json())
      .then((data) => {
        console.log('Received contacts:', data); // Log received contacts
        // Format phone numbers
        const formattedContacts = data.map(contact => ({
          ...contact,
          phoneNumber: formatPhoneNumber(contact.phoneNumber)
        }));
        setContacts(formattedContacts);
        setFilteredContacts(formattedContacts); // Initialize filtered contacts
      })
      .catch((error) => {
        console.error('Error fetching contacts:', error);
      });
  }, []);

  useEffect(() => {
    // Filter contacts based on search query
    const filtered = contacts.filter(contact => 
      (contact.firstName && contact.firstName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (contact.lastName && contact.lastName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (contact.phoneNumber && contact.phoneNumber.includes(searchQuery))
    );
    setFilteredContacts(filtered);
  }, [searchQuery, contacts]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleRowClick = (phoneNumber) => {
    router.push(`/contacts/${phoneNumber}`);
  };

  return (
    <Layout>
      <div className="p-4 flex-1 overflow-auto">
        <h1 className="text-2xl font-semibold mb-4 text-black">Contacts</h1>
        <input
          type="text"
          className="w-full p-2 mb-4 border border-gray-300 text-black"
          placeholder="Search contacts..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        {filteredContacts.length > 0 ? (
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-black">First Name</th>
                <th className="py-2 px-4 border-b text-black">Last Name</th>
                <th className="py-2 px-4 border-b text-black">Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts.map((contact, index) => (
                <tr 
                  key={index} 
                  className="text-center cursor-pointer" 
                  onClick={() => handleRowClick(contact.phoneNumber)}
                >
                  <td className="py-2 px-4 border-b text-black">{contact.firstName}</td>
                  <td className="py-2 px-4 border-b text-black">{contact.lastName}</td>
                  <td className="py-2 px-4 border-b text-black">{contact.phoneNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-black">No contacts available.</p>
        )}
      </div>
    </Layout>
  );
};

export default Contacts;
