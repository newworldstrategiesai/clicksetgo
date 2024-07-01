import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';

const Home = () => {
  return (
    <Layout>
      <div className="p-4">
        <h1 className="text-2xl font-semibold mb-4">Home</h1>
        <ul>
          <li className="mb-2">
            <Link href="/sms-text-conversations">
              <a className="text-blue-500">SMS Text Conversations</a>
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/contacts">
              <a className="text-blue-500">Contacts</a>
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/upload-contacts">
              <a className="text-blue-500">Upload Contacts</a>
            </Link>
          </li>
        </ul>
      </div>
    </Layout>
  );
};

export default Home;
