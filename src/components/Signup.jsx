import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"; 
import { auth, db } from '../../utils/firebase'
import { upload } from '../../utils/upload'

const Signup = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState({
        username: "",
        email: "",
        password: ""
    })

    const [avatarImg, setAvatarImg] = useState({
        file: null,
        url: ""
    })

    const handleAvatar = (e) => {
        if(e.target.files[0]){
            setAvatarImg({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            })
        }
    }

    const handleSignup = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const res = await createUserWithEmailAndPassword(auth, data.email, data.password)
            const imgUrl = await upload(avatarImg.file)

            await setDoc(doc(db, "users", res.user.uid), {
                id: res.user.uid,
                username: data.username,
                email: data.email,
                avatar: imgUrl,
                blocked: []
            })

            await setDoc(doc(db, 'userchats', res.user.uid), {
                chats: []
            })

            setData({
                username: "",
                email: "",
                password: ""
            })
            setAvatarImg({
                file: null,
                url: ""
            })
            toast.success("Sign up success, please signin!")
        } catch (error) {
            console.log(error.message)
            toast.error(error.message)
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <div className='flex-1 flex flex-col gap-y-8'>
            <div className='flex flex-col gap-y-2 pl-20'>
                <h1 className='text-2xl text-gray-600'>Chat App</h1>
                <h2 className='text-lg text-gray-600'>Sign Up</h2>
            </div>
            <form className='flex flex-col gap-y-5 pl-20' onSubmit={handleSignup}>
                <input type="text" value={data.username} onChange={(e) => setData(prevState => ({...prevState, username: e.target.value}))} className="bg-[#ccc] max-w-md rounded-md p-2 outline-none border-none text-sm text-gray-600" placeholder='Username...' />
                <input type="email" value={data.email} onChange={(e) => setData(prevState => ({...prevState, email: e.target.value}))} className="bg-[#ccc] max-w-md rounded-md p-2 outline-none border-none text-sm text-gray-600" placeholder='Email...' />
                <input type="password" value={data.password} onChange={(e) => setData(prevState => ({...prevState, password: e.target.value}))} className="bg-[#ccc] max-w-md rounded-md p-2 outline-none border-none text-sm text-gray-600" placeholder='Password...' />
                <div className='flex gap-3 items-center'>
                    <img src={avatarImg.url || "/images/avatar.png"} alt="Avatar" className='w-[40px] h-[40px] object-cover rounded-full' />
                    <label htmlFor="avatar" className='text-gray-600 cursor-pointer'>Upload avatar</label>
                    <input type="file" className='hidden' id='avatar' onChange={handleAvatar}/>
                </div>
                <button type='submit' className={isLoading ? 'bg-gray-300 text-gray-500 cursor-not-allowed p-2 max-w-md rounded-md' : 'text-white bg-[#00BFFF] p-2 max-w-md rounded-md'} disabled={isLoading}>Sign up</button>
            </form>
        </div>
    )
}

export default Signup