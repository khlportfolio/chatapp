import React from 'react'
import Auth from './components/Auth'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { onAuthStateChanged } from "firebase/auth"
import { useUserStore } from '../utils/useUserStore';
import { useEffect } from 'react';
import { auth } from '../utils/firebase';
import BarLoader from "react-spinners/BarLoader"

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "white",
};

const App = () => {
    const { currentUser, isLoading, fetchUser } = useUserStore()

    useEffect(() => {
        const unSub = onAuthStateChanged(auth, (user) => {
            fetchUser(user?.uid)
        })

        return () => {
            unSub()
        }
    }, [fetchUser])

    if(isLoading) return <div className='h-screen flex items-center'>
        <BarLoader color="#fff"
        loading={isLoading}
        cssOverride={override}
        size={250}
        aria-label="Loading Spinner"
        data-testid="loader"/>
    </div>

    return (
        <main className='flex justify-center items-center w-full h-screen'>
            {currentUser ? (
                <p>Hello</p>
            ): (
                <Auth />
            )}
            <ToastContainer position='bottom-right'/>
        </main>
    )
}

export default App