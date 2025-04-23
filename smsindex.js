const express = require('express');
require('dotenv').config();
const smsRoutes = require('./Routes/sms');

const app = express();
app.use(express.json());

app.use('/api/sms', smsRoutes);

const PORT = process.env.PORT || 4600;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
