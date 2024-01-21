import React, { useState } from "react";
import logo from "../images/Logo.svg";
import { Link } from "react-router-dom";
import burger from "../images/Burger.svg";
import close from "../images/CloseIcon.svg";
import { Route, Routes } from "react-router-dom";

const Header = ({ onSignOut, userEmail }) => {

  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);


  const handleBurgerMenu = () => {
    setIsBurgerMenuOpen(!isBurgerMenuOpen)
  }

  return (
    <>
      <div className={isBurgerMenuOpen ? 'header__burger-container' : 'header__burger-container header__burger-container_closed'}>
        <Routes>
          <Route path="sign-in" element={
            <Link to={"/sign-up"} className={'header__login'}>Регистрация</Link>
          } />
          <Route path="sign-up" element={
            <Link to={"/sign-in"} className={'header__login'}>Войти</Link>
          } />
          <Route path="/" element={
            <>
              <p className="header__email">{userEmail}</p>
              <Link to={"/sign-in"} className={'header__login header__login_logged'} onClick={onSignOut}>Выйти</Link>
            </>
          } />
        </Routes>
      </div>
      <header className="header">

        <Link to={'/'}><img className="header__logo" src={logo} alt="логотип" /></Link>
        <div className="header__container">
          <Routes>
            <Route path="sign-in" element={
              <Link to={"/sign-up"} className={'header__login'}>Регистрация</Link>
            } />
            <Route path="sign-up" element={
              <Link to={"/sign-in"} className={'header__login'}>Войти</Link>
            } />
            <Route path="/" element={
              <>
                {userEmail && <p className="header__email">{userEmail}</p>}
                <Link to={"/sign-in"} className={'header__login header__login_logged'} onClick={onSignOut}>Выйти</Link>
              </>
            } />
          </Routes>
        </div>
        <button onClick={handleBurgerMenu} className="header__burger-button"><img className="header__burger-image" src={isBurgerMenuOpen ? close : burger} alt="" /></button>
      </header>
    </>
  );
};

export default Header;
