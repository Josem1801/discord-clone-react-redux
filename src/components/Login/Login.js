import React from 'react'
import './css/Login.css'
import LogoDiscord from '../../assets/discord-logo.svg'
import LogoGoogle from '../../assets/google.png'
import { auth, provider } from '../../firebase'
import { useDispatch } from 'react-redux'
import { login } from '../../features/userSlice'
import { setServerId } from '../../features/appSlice'

function Login() {
    const dispatch = useDispatch()
    const randomId = '000000'+ Math.floor(Math.random() * (100 - 0));
    const randomName = Math.floor(Math.random() * (100 - 0))
    const signIn = async () => {
        await auth.signInWithRedirect(provider).catch((error) => alert(error.message))
    }
    const signInInvited = () => {
        dispatch(login({
            uid: randomId,
            photo: 'I',
            email: 'invitado@gmail.com',
            displayName: `Invitado ${randomName}`
        }))
        dispatch(
            setServerId({
                serverId: "localId",
                serverName: randomName,
            })
        )
    }
    return (
        <div className='login'>
            <div className="login__card">
                <img src={LogoDiscord} alt=""/>
                <div onClick={signIn} className='login__btn-google'>
                    <img src={LogoGoogle} alt="Google"/>
                    <p>Iniciar sesión con Google</p>
                </div>
                <div onClick={signInInvited} className='login__btn-invited'>
                    <p>Modo invitado</p>
                </div>
            </div>
        </div>
    )
}

export default Login
