/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
  }
  
  module.exports = nextConfig


  require('dotenv').config();

module.exports = {
  env: {
    VAPI_API_KEY: process.env.VAPI_API_KEY,
  },
};

  