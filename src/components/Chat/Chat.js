import React, { useEffect, useRef, useState } from 'react'
import './css/Chat.css'
import firebase from 'firebase/app'
import 'firebase/firestore'

//Write messages's icons
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RedeemIcon from '@material-ui/icons/Redeem';
import GifIcon from '@material-ui/icons/Gif';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';

import { IconButton } from '@material-ui/core';
import db from '../../firebase';
import { useSelector } from 'react-redux';
import ChatHeader from './ChatHeader';
import Message from './Message';
import { selectUser } from '../../features/userSlice';
import { selectCategoryId, selectChannelId, selectServerId, selectServerName } from '../../features/appSlice';


function Chat() {
    const serverId = useSelector(selectServerId)
    const categoryId = useSelector(selectCategoryId)
    const channelId = useSelector(selectChannelId)

    const user = useSelector(selectUser)
    const serverName = useSelector(selectServerName)


    const [input, setInput] = useState("") //<----------Input

    const [messages, setMessages] = useState([])

    const handdleChange = (e) => { //<-------Funcion del evento onChange para actualizar el estado
        setInput(e.target.value)
    }

    const handdleAddMessage = (e) => {
        e.preventDefault()
        if(input.trim().length > 0){
            db.collection('servers').doc(serverId)
            .collection('categorys').doc(categoryId)
            .collection('channels').doc(channelId)
            .collection('/messages').add({
                photo: user.photo,
                userName: user.displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                message: input,
            })
        }else{
            alert('Enter something please')
        }
        
    }
    useEffect(() => {
        if(channelId){
            db.collection('servers').doc(serverId)
            .collection('categorys').doc(categoryId)
            .collection('channels').doc(channelId)
            .collection('messages').orderBy('timestamp','asc').onSnapshot(snapshot => {
                setMessages(snapshot.docs.map(doc => ({
                    messageId: doc.id,
                    messageData: doc.data()
            }   )))
            })
        }

    },[channelId])

    return (
        <div className='chat'>

            {/* Header's chat */}
            <ChatHeader/>


            {/* Message's chat */}
            <main className='chat__body'>
                {
                    messages.map( ( {messageId,messageData} ) => (
                        <Message
                            key={messageId}
                            message={messageData.message}
                            image={messageData.photo}
                            timestamp={messageData.timestamp}
                            userName= {messageData.userName}
                        />
                    ))
                }
              

            </main>


            {/* white a message section */}
            <div className='chat__footer'>
                <div className="chat__footer-send-message">
                    <IconButton>
                        <AddCircleIcon style={{"fontSize":"28px"}}/>
                    </IconButton>
                    <form>
                        <input
                            type="text"
                            onChange={handdleChange}
                            placeholder={`Enviar mensaje a ${serverName ? serverName : user.displayName }`}
                        />
                        <button 
                            disabled={!channelId}
                            onClick={handdleAddMessage} 
                            type="submit"
                        >Send Message</button>
                    </form>
                    <IconButton>
                        <RedeemIcon style={{"fontSize":"28px"}}/>
                    </IconButton>
                    <IconButton>
                        <GifIcon style={{"fontSize":"28px"}}/>
                    </IconButton>
                    <IconButton>  
                        <SentimentVeryDissatisfiedIcon style={{"fontSize":"28px"}}/>
                    </IconButton>
                </div>
            </div>
        </div>
    )
}

export default Chat
