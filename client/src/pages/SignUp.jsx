import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../assets/Watermark.png'
import { Label, TextInput, Button, Alert, Spinner } from 'flowbite-react'
import { useState } from 'react'

export default function SignUp() {
  const [formData, setFormData] = useState({})
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value.trim()
    })
  }
  
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.email || !formData.password || !formData.username) {
      setError('Please fill all details.')
      return
    }
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('/api/auth/signUp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const data = await response.json()
      if (response.ok) {
        navigate('/login');
      }
      if (data.success === false) {
        return setError(data.message)
      }
      setLoading(false)
      console.log(data)
    } catch (error) {
      console.log(error)
      setError(error.message)
      setLoading(false)
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
              <Label value="Your username" className="dark:text-white">
              </Label>
              <TextInput id="username" type="text" placeholder="Needs to be super quirky..." required onChange={handleChange}/>
            </div>
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
              ) : 'Sign Up'}
            </Button>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Already have an account?</span>
            <Link to="/login" className='text-blue-500'>Sign In</Link>
          </div>
          {error && (
            <Alert color="failure" dismissible={true}>
              {error}
            </Alert>
            )}
        </di>
      </div>
    </div>
  )
}
