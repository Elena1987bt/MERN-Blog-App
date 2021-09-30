import React from 'react'
import './header.css'
const Header = () => {
    return (
        <div className="header">
            <div className="headerTitles">
                <span className='headerTitleSm'>React & Node</span>
                <span className='headerTitleLg'>Blog</span>
            </div>
            <img src="https://images.pexels.com/photos/5707560/pexels-photo-5707560.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="" className="headerImg"/>
        </div>
    )
}

export default Header