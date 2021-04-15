import { Avatar } from '@material-ui/core'
import React from 'react'
import './css/Message.css'

function Message({image, userName, timestamp, message}) {
    return (
        <div className='chat__message chat__reciever'>
            <Avatar src={image}/>
            <div className="message">
                <h3 className="chat__message-name">
                    {userName}  
                    <span className="chat__message-time">
                        {new Date(timestamp?.toDate()).toUTCString()}
                    </span>
                </h3>
                <p>{message}</p>
            </div>
        </div>
    )
}

export default Message
