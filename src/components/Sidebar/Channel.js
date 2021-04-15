import React from 'react'
import { useDispatch } from 'react-redux'
import { setChannelId } from '../../features/appSlice'

function Channel({channelId, channelName}) {

    const dispatch = useDispatch()

    const handdleDispatchChannel = () => {
        dispatch(setChannelId({
            channelId: channelId,
            channelName: channelName,
        }))
    }

    return (
        <div className="sidebar__server-channels" onClick={handdleDispatchChannel}>
            <span className='sidebar__server-channels-hash'>#</span>
            <p>{channelName}</p>
        </div>
    )
}

export default Channel
