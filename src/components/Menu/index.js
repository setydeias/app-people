import React, { useEffect, useState, useRef }  from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import { getTopNav } from '../../data/navbars';

const Menu = () => { 

    const Ref = useRef(null);
    const [navItems, setNavItems] = useState([]);
    const [collapse, setCollapse] = useState("nav__menu");
    const [toggleIcon, setToggleIcon] = useState("toggler__icon");

    useEffect(()=>{
        setNavItems(getTopNav());
    }, [])
    
  
    const onToggle = () => {
        collapse === "nav__menu"
            ? setCollapse("nav__menu nav__collapse")
            : setCollapse("nav__menu");
        toggleIcon === "toggler__icon"
            ? setToggleIcon("toggler__icon toggle")
            : setToggleIcon("toggler__icon");
    };


  return(
    <div className="nav__wrapper shadow p-3 mb-5 bg-body rounded">
      <div className="container">
        <nav className="nav">
          <Link to="#" className="nav__brand" style={{ color: '#fff', textDecoration: 'none'}}>
            <img src="http://setydeias.com.br/wp-content/uploads/2020/02/Nome-da-Logo-1-1.png" width="200" height="40" alt="Logo Setydeias" loading="lazy" />
          </Link>
          <ul className={collapse}>             
            <li className="nav__item">
              <Link to={"/logout"} className="nav__link"  id="link_logout" style={{ color: '#000', textDecoration: 'none'}}><i className="fas fa-sign-out-alt fa-1x"></i> Sair<span className="sr-only">(current)</span></Link>
            </li>
          </ul>
          <div className={toggleIcon} onClick={onToggle}>
            <div className="line__1"></div>
            <div className="line__2"></div>
            <div className="line__3"></div>
          </div>
        </nav>
      </div>
    </div>
  )

}

export default Menu;