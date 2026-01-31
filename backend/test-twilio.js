require('dotenv').config();
const twilio = require('twilio');
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

client.messages.create({
  body: 'Test SMS from Ethiopia Agri Platform',
  from: process.env.TWILIO_NUMBER,
  to: '+15551234567'  // ← your own Ethiopian number for testing
})
.then(msg => console.log('Success! SID:', msg.sid))
.catch(err => console.log('Error:', err.message));