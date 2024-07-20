import React from 'react'
import { Button } from 'flowbite-react'
import { AiFillGoogleCircle } from "react-icons/ai";
import { GoogleAuthProvider, signInWithPopup, getAuth} from 'firebase/auth'
import { app } from '../../firebase';
import { useDispatch } from 'react-redux';
import { loginSucess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
    const auth = getAuth(app)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleGoogleClick = async() => {
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({
            prompt: 'select_account'
        })
        try {
            const gresult = await signInWithPopup(auth, provider)
            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: gresult.user.displayName,
                    email: gresult.user.email,
                    googlePhotoURL: gresult.user.photoURL
                })
            })
        const data = await res.json()
        if (res.ok) {
            dispatch(loginSucess(data))
            navigate('/');
        }
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <Button type="button" gradientDuoTone="purpleToBlue" outline onClick={handleGoogleClick}>
        <AiFillGoogleCircle className='w-6 h-6 mr-2' />
        <span className='ml-2'>Sign in with Google</span>
    </Button>
  )
}
