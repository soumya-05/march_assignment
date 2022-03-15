import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import Header from '../component/Header'
import Footer from '../component/Footer'

const SignUp = ({ history }) => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    username: '',
    address: '',
    phone: '',
    dob: '',
  })

  const { name, email, password, username, address, phone, dob } = values

  const handleChange = (name) => (e) => {
    console.log(e.target.value)
    setValues({ ...values, [name]: e.target.value })
  }
  const handleChangeEmail = (email) => (e) => {
    console.log(e.target.value)
    setValues({ ...values, [email]: e.target.value })
  }
  const handleChangePwd = (password) => (e) => {
    console.log(e.target.value)
    setValues({ ...values, [password]: e.target.value })
  }
  const handleChangeUsername = (username) => (e) => {
    console.log(e.target.value)
    setValues({ ...values, [username]: e.target.value })
  }
  const handleChangeAddress = (address) => (e) => {
    console.log(e.target.value)
    setValues({ ...values, [address]: e.target.value })
  }
  const handleChangePhone = (phone) => (e) => {
    console.log(e.target.value)
    setValues({ ...values, [phone]: e.target.value })
  }
  const handleChangeDob = (dob) => (e) => {
    console.log(e.target.value)
    setValues({ ...values, [dob]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/signup', {
        name,
        username,
        address,
        phone,
        email,
        dob,
        password,
      })

      console.log(data)

      if (data.success === true) {
        setValues({ name: '', email: '', password: '' })
        toast.success('Sign up successfully, please Login!')
        history.push('/signin')
      }
    } catch (err) {
      console.log(err.response.data.error)
      toast.error(err.response.data.error)
    }
  }

  return (
    <div>
      <Header />
      <div className='container custom_className pt-5'>
        <h2 className='signup_title text-center'>SIGN UP</h2>
        <form className=' col-sm-6 offset-3 pt-5 signup_form'>
          <div className='form-outline mb-4'>
            <input
              type='text'
              placeholder='Name'
              name='name'
              value={name}
              onChange={handleChange('name')}
              required
            />
          </div>
          <div className='form-outline mb-4'>
            <input
              type='text'
              placeholder='Username'
              name='username'
              value={username}
              onChange={handleChangeUsername('username')}
              required
            />
          </div>
          <div className='form-outline mb-4'>
            <input
              type='text'
              placeholder='Address'
              name='address'
              value={address}
              onChange={handleChangeAddress('address')}
              required
            />
          </div>
          <div className='form-outline mb-4'>
            <input
              type='text'
              placeholder='Phone'
              name='phone'
              value={phone}
              onChange={handleChangePhone('phone')}
              required
            />
          </div>
          <div className='form-outline mb-4'>
            <input
              type='text'
              placeholder='DOB'
              name='dob'
              value={dob}
              onChange={handleChangeDob('dob')}
              required
            />
          </div>
          <div className='form-outline mb-4'>
            <input
              type='email'
              placeholder='Email Address'
              name='email'
              value={email}
              onChange={handleChangeEmail('email')}
              required
            />
          </div>

          <div className='form-outline mb-4'>
            <input
              type='password'
              placeholder='Password'
              name='password'
              value={password}
              onChange={handleChangePwd('password')}
              required
            />
          </div>

          <button
            onClick={handleSubmit}
            type='submit'
            className='btn btn-primary btn-block mb-4'
          >
            Register
          </button>
        </form>
      </div>
      <Footer />
    </div>
  )
}

export default SignUp
