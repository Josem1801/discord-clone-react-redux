import React, { useEffect, useState } from 'react'
import './css/Categorys.css'
//Icons
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import AddIcon from '@material-ui/icons/Add';
import db from '../../firebase';
import { selectCategoryId, selectServerId, setCategoryId } from '../../features/appSlice';
import { useDispatch, useSelector } from 'react-redux';
import Channel from './Channel';

function SidebarCategory( {categoryId, categoryName} ) {
    const [channels, setChannels] = useState([])
    const [expandMore, setExpandMore] = useState(false)

    const serverId = useSelector(selectServerId)

    const dispatch = useDispatch()

    //Dispatch category info to redux storage
    const handdleDispatchCategory = () => {
        dispatch(setCategoryId({
            categoryId: categoryId,
            categoryName: categoryName,
        }))
        setExpandMore(!expandMore)
    }

    const handdleAddChannel = () => {
        const channel = prompt("Enter the channel's name") ? this : '';
        console.log(channel)
        if(channel.trim().length > 0 ){
            db.collection('servers').doc(serverId)
            .collection('categorys').doc(categoryId)
            .collection('/channels').add({
                channelName: channel,
            })
        }else{
            alert('Enter something please')
        }

    }

    useEffect(() => {

        if(categoryId){
            db.collection('servers').doc(serverId)
            .collection('categorys').doc(categoryId)
            .collection('channels').onSnapshot(snapshot => {
                setChannels(snapshot.docs.map(doc => ({
                    channelId: doc.id,
                    channel: doc.data()
            }   )))
            })
        }
    },[categoryId])

    return (
        <div  className="sidebar__server-categorys">
            <div className='sidebar__server-categorys-title'>
                <p onClick={handdleDispatchCategory}>
                    {expandMore ? 
                    <KeyboardArrowRightIcon style={{"transform": "rotate(90deg)"}}/> 
                    :<KeyboardArrowRightIcon />}
                    {categoryName /*Category's name*/} 
                </p>

                <abbr title="Crear Canal">
                    <AddIcon onClick={handdleAddChannel}/>
                    </abbr>

            </div>
            {
                expandMore && (
                    channels.map(( {channelId,channel} ) => (
                        <Channel 
                            key={channelId} 
                            channelId={channelId}
                            channelName={channel.channelName}
                        />
                    ))
                )
            }

        </div>
    
    )
}

export default SidebarCategory
