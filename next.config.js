/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")
const runtimeCaching = require('next-pwa/cache')

module.exports = withPWA({
  reactStrictMode: true,
  images : {
    domains: ['cms.nhl.bamgrid.com', 'm.files.bbci.co.uk', 'a57.foxsports.com', 'talksport.com',
  'ichef.bbci.co.uk', 'a3.espncdn.com', 'img.bleacherreport.net', 'a1.espncdn.com', 
  'a4.espncdn.com', 'a2.espncdn.com', 'a5.espncdn.com', 'a0.espncdn.com', 'cdn.mos.cms.futurecdn.net', '']
  },
  pwa: {
    dest: "public",
    runtimeCaching,
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_EV == 'development'
  }
})
