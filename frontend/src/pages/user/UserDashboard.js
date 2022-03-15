import React, { useState, useEffect } from 'react'
import Header from '../../component/Header'
import Footer from '../../component/Footer'
import axios from 'axios'
import { toast } from 'react-toastify'

const UserDashboard = ({ history }) => {
  const [profile, setProfile] = useState('')
  const { name, email, role, createdAt, username, address, phone, dob } =
    profile

  useEffect(() => {
    fetch('/api/getme')
      .then((res) => {
        return res.json()
      })
      .then((result) => {
        //console.log(result)
        setProfile(result.user)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])
  const handleLogout = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.get('/api/logout')

      console.log(data)

      if (data.success === true) {
        toast.success('Logged out successfully, please Login!')
        history.push('/signin')
      }
    } catch (err) {
      console.log(err.response.data.error)
      toast.error(err.response.data.error)
    }
  }

  return (
    <>
      <Header />

      <div className='container-fluid dashboard_container'>
        <div className='row'>
          <div className='col-sm-4'>
            <div className='card card_dashboard'>
              <div className='card-header'>
                <b>User Dashboard</b>
              </div>
              <ul className='list-group list-group-flush'>
                <li className='list-group-item'> Name: {name}</li>
                <li className='list-group-item'> Username: {username}</li>
                <li className='list-group-item'> Address: {address}</li>
                <li className='list-group-item'> Phone: {phone}</li>
                <li className='list-group-item'> E-mail: {email}</li>
                <li className='list-group-item'> DOB: {dob}</li>
                <li className='list-group-item'>
                  {' '}
                  Join at: {new Date(createdAt).toLocaleDateString()}
                </li>
                <li className='list-group-item'>
                  {' '}
                  {role === 1 ? 'Admin' : 'Registred User'}
                </li>
              </ul>
            </div>
          </div>
          <button
            onClick={handleLogout}
            type='submit'
            className='btn btn-primary btn-block mb-4'
          >
            Logout
          </button>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default UserDashboard
