import React from 'react'
import './AppDownload.css'
import { assets } from '../../assets/assets'

const AppDownload = () => {
  return (
    <div className='app-download' id='app-download'>
        <p>For Better Experience Download <br /> foodApp</p>
        <div className='app-download-platforms'>
            <img src={assets.play_store} alt="p" />
            <img src={assets.app_store} alt="p" />
        </div>
    </div>
  )
}

export default AppDownload