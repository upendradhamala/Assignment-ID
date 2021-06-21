import React, { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios'
import Message from './Message'
import Loading from './Loading'
const Home = () => {
  const { user, isLoading, logout } = useAuth0()
  const [msg, setMsg] = useState(null)
  const [name, setName] = useState(user?.name)
  const [email, setEmail] = useState(user?.email)
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState(user?.username)
  const [image, setImage] = useState(user?.picture)
  const [show, setShow] = useState(false)
  const handleImage = async (e) => {
    setLoading(true)
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('file', file)
    formData.append(
      'upload_preset',
      process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
    )
    await axios({
      url: process.env.REACT_APP_CLOUDINARY_URL,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: formData,
    })
      .then(function (res) {
        setImage(res.data.url)
        setLoading(false)
      })
      .catch(function (err) {
        console.error(err)
      })
  }
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  const formHandler = async (e) => {
    e.preventDefault()

    const { data } = await axios.post(
      '/register',
      { name, address, email, image, username },
      config
    )
    setMsg(data)

    setShow(true)
    setTimeout(() => {
      setShow(false)
    }, 3000)
  }
  useEffect(() => {
    const userFind = async () => {
      const { data } = await axios.get(`/${email}`)
      console.log('value of data', data)
      setAddress(data.address)
      setUsername(data.username)
      setName(data.name)
      setImage(data.image)
    }
    userFind()
  }, [user])
  return (
    <div className='HomePage-outer'>
      {console.log('user is', user)}

      <div className='navbar'>
        <ul>
          <li>Home</li>
          <li>About Us</li>
          <li>Goals</li>
          <li
            className='btn-logout'
            onClick={() => logout({ returnTo: window.location.origin })}
          >
            LogOut
          </li>
        </ul>
      </div>
      {isLoading && <Loading />}
      {user && (
        <div className='profileInfo'>
          <form onSubmit={formHandler}>
            <div className='control-label'>
              <img
                className='imgperson'
                src={loading ? '/Images/loader1.gif' : image}
                alt=''
              />

              <input
                type='file'
                id='actual-btn'
                hidden
                accept='image/*'
                onChange={handleImage}
              />
              <label className='upload-label' htmlFor='actual-btn'>
                Choose File
              </label>
            </div>
            <div className='control-label'>
              <label> Name </label>
              <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className='control-label'>
              <label> Email </label>
              <input type='email' value={email} required />
            </div>
            <div className='control-label'>
              <label> Address </label>
              <input
                type='text'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className='control-label'>
              <label> Username </label>
              <input
                type='text'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <button type='submit' className='btn-update'>
              Update Profile
            </button>
            {msg && (
              <div className='msgcomp'>
                {show && <Message message={msg} color='green' />}
              </div>
            )}
          </form>
        </div>
      )}
      <div className='profile-right'>
        <span>Hello there</span>
      </div>
    </div>
  )
}

export default Home
