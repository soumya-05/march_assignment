import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import Header from '../component/Header'
import Footer from '../component/Footer'

const SignIn = ({ history }) => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  })

  const { email, password } = values

  const handleChange = (name) => (e) => {
    // console.log(e.target.value);
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/signin', {
        email,
        password,
      })

      console.log(data)

      if (data.success === true) {
        setValues({ email: '', password: '' })
        toast.success('Log In successfully')
        history.push('/user/dashboard')
        if (typeof window !== 'undefined') {
          localStorage.setItem('token', JSON.stringify(data))
        }
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
        <h2 className='signup_title text-center'>SIGN IN</h2>
        <form className=' col-sm-6 offset-3 pt-5 signup_form'>
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
            Log In
          </button>
        </form>
      </div>
      <Footer />
    </div>
  )
}

export default SignIn
