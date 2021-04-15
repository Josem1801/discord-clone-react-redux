import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setServerId, setCategoryId } from '../../features/appSlice';
import { selectUser } from '../../features/userSlice';
import db from '../../firebase';
import './css/Sidebar.css'

import SidebarServer from '././SidebarServer'
import SidebarPhotos from './SidebarPhotos';



function Sidebar() {
    const user = useSelector(selectUser)
    const dispatch = useDispatch()
    

    return (
        <div className='sidebar'>

            {/* User's Photos*/}

            <SidebarPhotos/>
            

            {/* User's Categorys*/}
            <SidebarServer/>
        </div>
    )
}

export default Sidebar
