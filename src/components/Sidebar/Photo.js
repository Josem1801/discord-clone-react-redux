import { Avatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setCategoryId, setServerId } from '../../features/appSlice'
import './css/Photo.css'

function Photo( {photoLink, alt, serverId, serverName, children} ) {
    
    const dispatch = useDispatch()
    

    const handdleInfoId = () => {
        dispatch(
            setServerId({
                serverId: serverId,
                serverName: serverName,
            })
        )
    }
    return(
        <div className="sidebar__photos-box" id='' onClick={handdleInfoId}>
            <span className={`sidebar__photos-box-hover`}></span>
            <div className="sidebar__photos-box-photo">
                
                {children ? children
                :<Avatar className='img' src={`${photoLink}`} alt={alt}/>}
            </div>
        </div>
    )
}

export default Photo