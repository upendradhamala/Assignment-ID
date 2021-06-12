import mongoose from 'mongoose'

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    address: {
      type: String,
    },
    image: {
      type: String,
    },
    username: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

const UserAuth = mongoose.model('UserAuth', userSchema)

export default UserAuth
