import React, { useEffect, useState } from 'react'
import './css/SidebarServer.css'
//Icons to sidebar channels section
import { Avatar, IconButton } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


//Icons user bottom 
import MicOffIcon from '@material-ui/icons/MicOff';
import HeadsetIcon from '@material-ui/icons/Headset';
import SettingsIcon from '@material-ui/icons/Settings';
import { selectUser } from '../../features/userSlice';
import { selectCategoryName, selectServerId, selectServerName } from '../../features/appSlice';
import { useSelector } from 'react-redux';
import db from '../../firebase';
import Categorys from './Categorys';


function SidebarChannels() {
    const [categorys, setCategorys] = useState([])
    const serverId = useSelector(selectServerId)

    const user = useSelector(selectUser)
    const serverName = useSelector(selectServerName)
    const categoryName = useSelector(selectCategoryName)

    function handdleAddCategory(){
        const category = prompt("Enter the new category's name");
        if(category == undefined){
            return(alert('Enter something please'))
        }
        if(category.trim().length > 0){
            db.collection('servers').doc(serverId).collection('/categorys').add({
                categoryName: category
            })
        }else{
            alert("Parece que olvidaste rellenar el campo. Intenta otra vez :)")
        }
    }

    useEffect(() => {
        if(serverId){
            db.collection('servers').doc(serverId).collection('categorys').onSnapshot(snapshot => {
                setCategorys(snapshot.docs.map(doc => ({
                    categoryId: doc.id,
                    category: doc.data()
                })))
            })
        }

    },[serverId])
    return (
        <section className="sidebar__server">

            {/* Sidebar Server Header */}
            <div className="sidebar__server-header">
                <h1>{serverName ? serverName : user.displayName }</h1>
                <IconButton onClick={handdleAddCategory}>
                    <ExpandMoreIcon/>
                </IconButton>
            </div>

            {/* Sidebar Server Body (Categorys and channels) */}
            <div className="sidebar__server-body">
            {
                categorys.map(({categoryId, category}) => (
                    <Categorys
                        key= {categoryId}
                        categoryId = {categoryId}
                        categoryName={category.categoryName}
                    />      
                ))
            }
            </div>
           
            {/* Sidebar Server Bottom */}
            
            <div className='sidebar__user'>
                <Avatar src={user.photo}/>
                <div className="sidebar__user-name">
                    <p>{user.displayName}</p>
                    <span className='sidebar__user-id'>#{user.uid.slice(0,6)}</span>
                </div>
                <abbr title="Desactivar Silencio">
                    <IconButton>
                        <MicOffIcon/>   
                    </IconButton>
                </abbr>
                <abbr title="Ensordecer">
                    <IconButton>
                        <HeadsetIcon/>
                    </IconButton>
                </abbr>
                <abbr title="Ajustes de usuario">
                    <IconButton>
                        <SettingsIcon/>
                    </IconButton>
                </abbr>
            </div>
        </section>
    )
}

export default SidebarChannels
