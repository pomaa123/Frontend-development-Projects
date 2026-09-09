import React from "react";
import '../index.css'
import Logo from '../assets/chef-hat.png'


function Header(params) {
    return(
    <header className="navbar">
        <nav className="nav-left">
            <a >RECIPES</a>
            <a >ABOUT</a>
            <a >FORUM</a>
            <a >CONTACT</a>
        </nav> 
            
        <div className="logo"><img src={Logo} /><span>KitRecips</span></div>
            
            <nav className="nav-right">
                <a href="#">FAV</a>
                <a href="#">PROFILE</a>
                <button><a href="#">SUBSCRIBE</a></button>
            </nav>

    </header>
    )
}


export default Header;