const https = require('https');

console.log('Fetching your current IP address...');

https.get('https://api.ipify.org?format=json', (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    try {
      const ipData = JSON.parse(data);
      console.log('\n==========================================');
      console.log(`Your current IP address is: ${ipData.ip}`);
      console.log('==========================================\n');
      console.log('To whitelist this IP in MongoDB Atlas:');
      console.log('1. Log in to MongoDB Atlas (https://cloud.mongodb.com)');
      console.log('2. Navigate to your cluster');
      console.log('3. Click on "Network Access" in the left sidebar');
      console.log('4. Click "Add IP Address" button');
      console.log('5. Enter the IP address shown above');
      console.log('6. Click "Confirm"');
      console.log('\nAfter whitelisting your IP, restart your server.');
    } catch (e) {
      console.error('Error parsing IP data:', e);
    }
  });
}).on('error', (err) => {
  console.error('Error fetching IP address:', err);
  console.log('\nYou can manually find your IP address by:');
  console.log('1. Going to https://whatismyipaddress.com/');
  console.log('2. Or searching "what is my ip" on Google');
}); 