import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../assets/Watermark.png'
import { Label, TextInput, Button, Alert, Spinner } from 'flowbite-react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginStart, loginSucess, loginFailure } from '../redux/user/userSlice'
import OAuth from '../components/OAuth'

export default function login() {
  const [formData, setFormData] = useState({})
  const dispatch = useDispatch()
  const { error: errorMessage, loading } = useSelector((state) => state.user)
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value.trim()
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.email || !formData.password) {
      return dispatch(loginFailure('Please fill all details.'))
    }
    try {
      dispatch(loginStart())
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const data = await response.json()
      if (response.ok) {
        dispatch(loginSucess(data))
        navigate('/');
      }
      if (data.success === false) {
        dispatch(loginFailure(data.message))
      }
      console.log(data)
    } catch (error) {
      console.log(error)
      dispatch(loginFailure(error.message))
    }
  }

  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        {/* Left */}
        <div className='flex-1 flex-col items-center justify-center h-full'>
          <div className="flex flex-col items-center">
            <img src={Logo} alt="Logo" className="h-40 w-auto mb-4" />
          </div>
          <div className='text-center'>
            <Link to="/" className='text-4xl font-bold dark:text-white text-center'>
              <span className='px-1 py-0.5 max-w-max whitespace-nowrap text-s bg-gradient-to-r from-cyan-600 via-violet-700 to-teal-400 rounded-lg text-white text-center'>Pixel's, Proses and Play</span>
              <span className="px-1 py-0.5 block text-s text-cyan-700 mt-3 text-center">Unraveling Bytes, Books, and Blockbusters</span>
            </Link>
          </div>
        </div>


        {/* Right */}
        <di className ='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value="Your email" className="dark:text-white"> 
              </Label>
              <TextInput id="email" type="email" placeholder="name@example.com" required onChange={handleChange}/>
            </div>
            <div>
              <Label value="Your password" className="dark:text-white"> 
              </Label>
              <TextInput id="password" type="password" placeholder="Super Secret..." required onChange={handleChange}/>
            </div>
            <Button gradientDuoTone="purpleToBlue" outline type='submit' disabled={loading}>
              {loading ? (
                <Spinner
                  aria-label="Extra large spinner button example"
                  size="xl"
                />
              ) : 'Login'}
            </Button>
            <OAuth />
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Don't have an account?</span>
            <Link to="/signUp" className='text-blue-500'>Join the Madness!</Link>
          </div>
          {errorMessage && (
            <Alert color="failure" dismissible={true}>
              {errorMessage}
            </Alert>
            )}
        </di>
      </div>
    </div>
  )
}

