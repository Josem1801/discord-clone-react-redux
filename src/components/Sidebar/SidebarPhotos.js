import React, { useEffect, useRef, useState } from 'react'
//Icons to sidebar image section
import AddIcon from '@material-ui/icons/Add';
import ExploreIcon from '@material-ui/icons/Explore';
import CancelIcon from '@material-ui/icons/Cancel';

import './css/SidebarPhotos.css'
import { selectUser } from '../../features/userSlice';
import db from '../../firebase';
import Photo from './Photo';
import { useSelector } from 'react-redux';


function SidebarPhotos() {
    //Hooks
    const user = useSelector(selectUser);
    const [addServer, setAddServer] = useState(false);
    const [servers, setServers] = useState([])
    const refServer = useRef();
    const refPhotoServer = useRef();


    //functions
    const handdleAddServer = () => {
        const nameServer = refServer.current.value
        const imageURL = refPhotoServer.current.value
        if(nameServer.trim().length && imageURL.trim().length> 1){
            db.collection('servers').add({
                nameServer,
                imageURL,
            })
        }else{
            alert("Algunos de los campos estan vacíos o no son validos. Ingresa un nombre y una URL valida.")
        }
        setAddServer(!addServer)
    }

    useEffect(() => {
        db.collection('servers').onSnapshot(snapshot => {
            setServers(snapshot.docs.map(doc => ({
                serverId: doc.id,
                server: doc.data()
            })))
        })
    }, [servers])

    return (
        <section className="sidebar__photos">

            {/*User defualt*/}
            <Photo serverName={user.displayName} serverId={'localId'} photoLink={user.photo} alt={user.displayName}/>
            <hr/>

            {/*Created Items*/}
            {
                servers.map(({serverId, server})=> (
                    <Photo
                        serverName={server.nameServer}
                        serverId={serverId}
                        key={serverId} 
                        photoLink={server.imageURL} 
                        alt={server.nameServer}
                    />
                ))
            }
            
            {/*Items default*/}

            <Photo>
                <AddIcon onClick={() => setAddServer(!addServer)} style={{"color": "#43B581"}} className='icon'/>
            </Photo>
            
            <Photo>
                <ExploreIcon style={{"color": "#43B581"}} className='icon'/>
            </Photo>

            {
                addServer && (
                    <form action="" className='add__server'>
                        <CancelIcon onClick={() => setAddServer(!addServer)}/>
                        <input  type="text" ref={refServer} placeholder='Name of the server'/>
                        <input type="url" ref={refPhotoServer} placeholder='Link of the image'/>
                        <input onClick={handdleAddServer} type="button" value="Add server"/>
                    </form>
                )
            }
            
        </section>
    )
}

export default SidebarPhotos
