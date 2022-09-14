import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
const app = express()
dotenv.config()


import authRoute from './routes/auth.route.js'
import userRoute from './routes/users.route.js'
import snippetRoute from './routes/snippets.route.js'
import collectionRoute from './routes/collections.route.js'


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

app.use(cookieParser())
app.use(express.json())

app.get('/', (req, res) => {
   res.send('index page')
})
app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/collection', collectionRoute)
app.use('/api/snippets', snippetRoute)

app.use((err, req, res, next) => {
   const status = err.status || 500;
   const message = err.message || 'Something went wrong';
   return res.status(status).json({
      sucess: false,
      status,
      message
   });
});

app.listen(port, () => console.log(`http://localhost:${port}/`))