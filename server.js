const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()
// const UserRoutes = require('./routes/user.routes')
// const AuthRoutes = require('./routes/auth.routes')
// const PostRoutes = require('./routes/post.routes')
const authRoutes = require('./Routes/auth');
const userRoutes = require('./Routes/user');
const appRoutes = require('./Routes/appointment');
const smsRoutes = require('./Routes/sms');
const chatRoutes = require('./Routes/chat');

const twilioRoutes = require('./Routes/twilio');  // Import the Twilio route
const callRoutes = require('./Routes/call');      // Import the Call route





const app = express();

app.use(express.json())
app.use('/api/auth', authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/appointment", appRoutes);
app.use('/api/chat', chatRoutes);

app.use('/api/twilio', twilioRoutes);  // For TwiML response route
app.use('/api/call', callRoutes);      // For making the call




app.use('/api/sms', smsRoutes);




// app.use('/users',UserRoutes)
// app.use('/auth',AuthRoutes)
// app.use('/post',PostRoutes)


const PORT = process.env.PORT || 4600
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('connecting to Database')
}).catch(err=>{
    console.log('error connecting to Database',err)
})

app.listen(PORT,()=>{
    console.log('listening on port 4600' )
})