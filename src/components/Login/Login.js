import React from 'react'
import './css/Login.css'
import LogoDiscord from '../../assets/discord-logo.svg'
import LogoGoogle from '../../assets/google.png'
import { auth, provider } from '../../firebase'

function Login() {
    
    const signIn = () => {
        auth.signInWithPopup(provider).catch((error) => alert(error.message))
    }

    return (
        <div className='login'>
            <div className="login__card">
                <img src={LogoDiscord} alt=""/>
                <div onClick={signIn} className='login__btn-google'>
                    <img src={LogoGoogle} alt="Google"/>
                    <p>Iniciar sesión con Google</p>
                </div>
            </div>
        </div>
    )
}

export default Login
