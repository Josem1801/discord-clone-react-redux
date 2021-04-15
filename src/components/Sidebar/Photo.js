import React from 'react'
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
                serverCategorys: null
            })
        )

    }

    return(
        <div className="sidebar__photos-box" onClick={handdleInfoId}>
            <span className='sidebar__photos-box-active'></span>
            <div className="sidebar__photos-box-photo">
                
                {children ? children
                :<img className='img' src={`${photoLink}`} alt={alt}/>}
            </div>
        </div>
    )
}

export default Photo