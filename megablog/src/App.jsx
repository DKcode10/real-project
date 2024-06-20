import React, { useState , useEffect } from 'react'
import  {useDispatch} from 'react-redux'
import './App.css'
import authService from './appwrite/auth'
import {login,logout} from './store/authSlice'
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'

const App = () => {

  const[loading,setLoading] = useState(true)
  const dispatch = useDispatch()


  useEffect (()=>{
authService.getCurrentUser()
.then((userDate)=>{
  if (userDate) {
    dispatch(login({userDate}))
  }else{
    dispatch(logout())
  }
})
.finally(()=>setLoading(false))
  },[])

return !loading ? (
  <div className='min-hhscreen flex flex-wrap content-between bg-gray-400 '> 
  <div className='w-full block'>
    <Header/>
     TODO {/* <Outlet/> */}
    <Footer/>
    </div> 
  </div>
) : null
}

export default App
