const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')

const authRoute = require('./routes/auth.route')
const userRoute = require('./routes/users.route')
const snippetRoute = require('./routes/snippets.route')

dotenv.config()
app.use(express.json())

const port = process.env.PORT || 5000

mongoose
   .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
   })
   .then(() => console.log('DB Connected!'))
   .catch(err => {
      console.log(`DB Connection Error: ${err.message}`);
   });

app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/snippets', snippetRoute)

app.listen(port, () => console.log(`http://localhost:${port}/`))