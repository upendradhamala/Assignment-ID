import express from 'express'
import dotenv from 'dotenv'
import asyncHandler from 'express-async-handler'

import UserAuth from './UserModel.js'
import connectDB from './db.js'
import path from 'path'
dotenv.config()

const app = express()

connectDB()
app.use(express.json())
const __dirname = path.resolve()

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', async (req, res) => {
    res.send('API is running...')
  })
}

app.post(
  '/register',
  asyncHandler(async (req, res) => {
    try {
      const { name, address, image, username, email } = req.body

      const userExists = await UserAuth.findOne({ email })
      console.log('already there')

      if (userExists) {
        ;(userExists.name = name),
          (userExists.address = address),
          (userExists.image = image),
          (userExists.username = username)
        await userExists.save()
        res.status(201).json('Successfully Updated')
      } else {
        const newUser = await UserAuth.create({
          name,
          address,
          email,
          image,
          username,
        })
        res.status(201).json('Successfully Updated')
      }
    } catch (error) {
      console.log(error)
      res.status(403).json(error)
    }
  })
)
app.get(
  '/:email',
  asyncHandler(async (req, res) => {
    try {
      console.log('reached')
      const user = await UserAuth.findOne({ email: req.params.email })
      if (user) {
        console.log(user)
        res.status(201).json(user)
      }
    } catch (error) {
      console.log(error)
      res.status(403).json('User not found')
    }
  })
)
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  console.log('err', err)
  res.status(statusCode)
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  })
})
app.listen(process.env.PORT, () => {
  console.log(`Backend running on port ${process.env.PORT}`)
})
