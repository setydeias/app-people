import React, { useEffect, useState, useRef }  from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import { getTopNav } from '../../data/navbars';
import { logImg } from '../img/logo.png';

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
      <>       
      <div className="nav__wrapper">
          <div className="container">
            <nav className="nav">
              <Link to="#" className="nav__brand" style={{ color: '#fff', textDecoration: 'none'}}>
                {/*<img src="http://setydeias.com.br/wp-content/uploads/2020/02/Nome-da-Logo-1-1.png" width="200" height="40" alt="" loading="lazy" />*/}
                <img src={logImg} width="50" height="50" alt="" loading="lazy" /> Setydeias cadastro
              </Link>
              <ul className={collapse}>
                <li className="nav__item">
                  <Link to={"/admin"} className="nav__link" style={{ color: '#fff', textDecoration: 'none'}}><i className="fas fa-home fa-1x"></i> Início <span className="sr-only">(current)</span></Link>
                </li>
                <li className="nav__item dropdown">
                  <li className="nav__link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ color: '#fff', textDecoration: 'none'}}><i className="fas fa-users fa-1x"></i> Clientes <span className="sr-only">(current)</span></li>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <Link className="dropdown-item" to={""}><i className="fas fa-user-edit"></i> Alterar</Link>
                    <Link className="dropdown-item" to={""}><i className="fas fa-search"></i> Consultar</Link>
                    <Link className="dropdown-item" to={""}><i className="fas fa-user-minus"></i> Excluir</Link>
                  </div>
                </li>
                <li className="nav__item">
                  <Link to={"/logout"} className="nav__link"  id="link_logout" style={{ color: '#fff', textDecoration: 'none'}}><i className="fas fa-sign-out-alt fa-1x"></i> Sair<span className="sr-only">(current)</span></Link>
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
      </>
  )

}

export default Menu;