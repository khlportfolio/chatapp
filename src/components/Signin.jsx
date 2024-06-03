import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { auth } from '../../utils/firebase'

const Signin = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const handleSignin = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            await signInWithEmailAndPassword(auth, data.email, data.password)

            setData({
                email: "",
                password: ""
            })

            window.location.reload()
            toast.success("Succesfully Signin")
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <div className='flex-1 flex flex-col gap-y-8'>
            <div className='flex flex-col gap-y-2 pl-20'>
                <h1 className='text-2xl text-gray-600'>Chat App</h1>
                <h2 className='text-lg text-gray-600'>Sign In</h2>
            </div>
            <form className='flex flex-col gap-y-5 pl-20' onSubmit={handleSignin}>
                <input type="email" value={data.email} onChange={(e) => setData(prevState => ({...prevState, email: e.target.value}))} className="bg-[#ccc] max-w-md rounded-md p-2 outline-none border-none text-sm text-gray-600" placeholder='Email...' />
                <input type="password" value={data.password} onChange={(e) => setData(prevState => ({...prevState, password: e.target.value}))} className="bg-[#ccc] max-w-md rounded-md p-2 outline-none border-none text-sm text-gray-600" placeholder='Password...' />
                <button type='submit' className={isLoading ? 'bg-gray-300 text-gray-500 cursor-not-allowed p-2 max-w-md rounded-md' : 'text-white bg-[#00BFFF] p-2 max-w-md rounded-md'} disabled={isLoading}>Sign in</button>
            </form>
        </div>
    )
}

export default Signin