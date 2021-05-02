import React from 'react'
import './css/ChatHeader.css'
//Header's icons
import NotificationsIcon from '@material-ui/icons/Notifications';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import BeenhereIcon from '@material-ui/icons/Beenhere';
import InboxIcon from '@material-ui/icons/Inbox';
import SearchIcon from '@material-ui/icons/Search';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { IconButton } from '@material-ui/core';

//LogOut
import { useDispatch, useSelector } from 'react-redux';
import { selectChannelName } from '../../features/appSlice';
import { auth } from '../../firebase';
import { logout } from '../../features/userSlice';

function ChatHeader() {
    const channelName = useSelector(selectChannelName)
    const dispatch = useDispatch()
 
    const logOut = () => {
        dispatch(logout())
        auth.signOut()
    }

    return (
        <header className='chat__header'>
            <div className="chat__header-title">
                <span className='chat__header-hash'>#</span>
                <h3>{channelName ? channelName: ''}</h3>
            </div>
            <div className="chat__header-icons">
                <abbr title="Silenciar">
                    <IconButton>
                        <NotificationsIcon />
                    </IconButton>
                </abbr>
                <abbr title="Mensajes fijados">
                    <IconButton>
                        <BeenhereIcon/>
                    </IconButton>
                </abbr>
                <abbr title="Lista de miembros">
                    <IconButton>
                        <PeopleAltIcon />
                    </IconButton>
                </abbr>
                <form action="">
                    <input type="text" className='search' placeholder='Buscar'/>
                    <SearchIcon/>
                </form>
                <abbr title="Bandeja de entrada">
                    <IconButton>
                        <InboxIcon/>
                    </IconButton>
                </abbr>
                <abbr title="Salir">
                    <IconButton onClick={logOut}>
                        <ExitToAppIcon/>
                    </IconButton>
                </abbr>
            </div>
            
        </header>
    )
}

export default ChatHeader
