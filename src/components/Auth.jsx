import React from 'react'
import Signin from './Signin'
import Signup from './Signup'

const Auth = () => {
  return (
    <div className='w-[98vw] h-[96vh] bg-[#fff] rounded-xl flex items-center justify-center'>
        <Signup />
        <div className='h-[80vh] w-[2px] bg-[#ccc] rounded-xl'/>
        <Signin />
    </div>
  )
}

export default Auth