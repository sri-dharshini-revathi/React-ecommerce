import React, {useState,useEffect, useContext} from 'react'
import {Link} from 'react-router-dom'
import {DataContext} from './DataProvider' 
import fire from './fire';
import "firebase/auth";

const Header = () => {
    const [menu, setMenu] = useState(false)
    const value = useContext(DataContext)
    const [cart] = value.cart
    const [currentUser,setCurrentUser] = useState('');
    
 

    const toggleMenu = () =>{
        setMenu(!menu)
    }

    const styleMenu = {
        left: menu ? 0 : "-100%"
    }

    useEffect(() => {
        fire.auth().onAuthStateChanged((user) => {
            setCurrentUser(user);
        });
    }, []);
   
    return (
        <header className="head">
      
            <div className="menu" onClick={toggleMenu}>
                <img src="https://raw.githubusercontent.com/devat-youtuber/react-router-v6-product-details/755a89501e6be303b8938425d331d5eac2c46192/src/components/svg/bars-solid.svg" alt="" width="30" />
            </div>

            <div className="logo">
                <h1><Link to="/products">E-commerce</Link></h1>
            </div>
            <ul style={styleMenu}>
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/products">Products</Link></li>
                <li><Link to="/">About</Link></li>
                <li><Link to="/">Contact</Link></li>
                {!currentUser ? (
                <li><Link to="/login">Login/Register</Link></li>
                ): (
                <li><Link to = "/login">{currentUser.email}</Link></li>
                )}
                <li onClick={toggleMenu}>
                    <img src="data:image/png;base64,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" alt="" width="30" className="menu" />
                </li>
            </ul>

            <div className="cart-icon">
                <span>{cart.length}</span>
                <Link to="/cart">
                    <img src="https://raw.githubusercontent.com/devat-youtuber/react-router-v6-product-details/755a89501e6be303b8938425d331d5eac2c46192/src/components/svg/cart.svg" alt="" width="30" />
                </Link>
            </div>
            
            
      </header>
    )
    }


export default Header;