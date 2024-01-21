import React, { useEffect, useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupImage from "./PopupImage";
import myApi from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { CardsContext } from "../contexts/CardsContext";
import { CardContext } from "../contexts/CardContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Logo from '../images/Logo.svg';
import PageOverlay from "./PageOverlay";
import DeleteCardPopup from "./DeleteCardPopup";
import { AppContext } from "../contexts/AppContext";
import ProtectedRoute from "./ProtectedRoute";
import Register from './Register';
import Login from './Login';
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import * as myAuthApi from "../utils/AuthApi";
import InfoTooltip from "./InfoTooltip";



function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [isImagePopupOpen, setisImagePopupOpen] = useState(false);
  const [cardData, setCardData] = useState({})
  const [isPageOverlayLoading, setIsPageOverlayLoading] = useState(false);
  const [isCardDeleteLoading, setIsCardDeleteLoading] = useState(false);
  const [isAddPlaceLoading, setIsAddPlaceLoading] = useState(false);
  const [isEditProfileLoading, setIsEditProfileLoading] = useState(false);
  const [isEditAvatarLoading, setIsEditAvatarLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isSuccessInfoTooltipStatus, setisSuccessInfoTooltipStatus] = useState(false);
  const [userEmail, setUserEmail] = useState('');


  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      Promise.all([myApi.getUserInfo(), myApi.getInitialCards()])
        .then((res) => {
          const [user, cards] = res;
          setCurrentUser(user)
          setCards(cards)
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setIsPageOverlayLoading(false)
        });
    }
  }, [isAuth])

  function handleClosePopupByEsc(e) {
    if (e.key === 'Escape') {
      closeAllPopups();
    }
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    myApi.changeLikeCardStatus(card, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleCardDelete(card) {
    setIsCardDeleteLoading(true)
    myApi.deleteCard(card)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsCardDeleteLoading(false)
      })

  }


  function handleUpdateUser({ name, about }) {
    setIsEditProfileLoading(true)
    myApi.patchUserInfo({ name, about })
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsEditProfileLoading(false)
      })
  }

  function handleUpdateAvatar({ avatar }) {
    setIsEditAvatarLoading(true)
    myApi.patchUserAvatar({ avatar })
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsEditAvatarLoading(false)
      })
  }

  function handleAddPlaceSubmit({ name, link }) {
    setIsAddPlaceLoading(true)
    myApi.postNewCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsAddPlaceLoading(false)
      })
  }

  const handleTrashBtnClick = (card) => {
    setCardData(card);
    setIsDeleteCardPopupOpen(true)
    window.addEventListener('keydown', handleClosePopupByEsc)
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true)
    window.addEventListener('keydown', handleClosePopupByEsc)
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true)
    window.addEventListener('keydown', handleClosePopupByEsc)
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true)
    window.addEventListener('keydown', handleClosePopupByEsc)
  };

  const handleCardClick = (card) => {
    setCardData(card);
    setisImagePopupOpen(true);
    window.addEventListener('keydown', handleClosePopupByEsc)
  }

  const closeAllPopups = () => {
    setIsDeleteCardPopupOpen(false)
    setisImagePopupOpen(false);
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsInfoTooltipOpen(false)
    window.removeEventListener('keydown', handleClosePopupByEsc);
  }

  const onSignUp = (data) => {
    myAuthApi.signUp(data)
      .then((res) => {
        setisSuccessInfoTooltipStatus(true)
        navigate('/sign-in', { replace: true })
      })
      .catch(() => {
        setisSuccessInfoTooltipStatus(false)
      })
      .finally(() => {
        setIsInfoTooltipOpen(true)
      })
  }

  const onSignIn = (data) => {
    myAuthApi.signIn(data)
      .then((res) => {
        if (res.message) {
          localStorage.setItem('isAuth', 'true');
          setIsAuth(true)
          setUserEmail(data.email)
          navigate('/', { replace: true })
        }
      })
      .catch(() => {
        setIsAuth(false)
        setisSuccessInfoTooltipStatus(false)
        setIsInfoTooltipOpen(true)
      })
  }

  const onSignOut = () => {
    myAuthApi.signOut()
      .then(() => {
        localStorage.removeItem('isAuth');
        setIsAuth(false)
        setUserEmail('')
        navigate('/sign-in', { replace: true })
      })
      .catch((err) => {
        console.log(err);
      })

  }

  // const handleTokenCheck = (jwt) => {
  //   myAuthApi.checkToken(jwt)
  //     .then((res) => {
  //       if (res) {
  //         setUserEmail(res.data.email);
  //         setIsAuth(true);
  //         navigate('/mesto', { replace: true });
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //       setIsAuth(false)
  //     })
  // }





  // useEffect(() => {
  //   const jwt = localStorage.getItem('jwt');
  //   if (jwt) {
  //     handleTokenCheck(jwt)
  //   }
  //   // eslint-disable-next-line
  // }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CardsContext.Provider value={cards}>
        <CardContext.Provider value={cardData} >
          <AppContext.Provider value={isAuth}>

            <div>
              <PageOverlay isLoading={isPageOverlayLoading} Logo={Logo} />
              <Header userEmail={userEmail} onSignOut={onSignOut} />
              <Routes>
                <Route path="/" element={
                  <ProtectedRoute
                    element={Main}
                    handleTrashBtnClick={handleTrashBtnClick}
                    onCardDelete={handleCardDelete}
                    onCardLike={handleCardLike}
                    onCardClick={handleCardClick}
                    onEditProfile={handleEditProfileClick}
                    onEditAvatar={handleEditAvatarClick}
                    onAddPlace={handleAddPlaceClick}
                    loggedIn={isAuth}
                  />
                } />
                <Route path="/sign-in" element={<Login submitHandler={onSignIn} />} />
                <Route path="/sign-up" element={<Register submitHandler={onSignUp} />} />
                <Route path="*" element={
                  !isAuth ? <Navigate to="/sign-in" /> : <Navigate to="/" />} />
              </Routes>

              <Footer />
              <InfoTooltip
                isSuccessInfoTooltipStatus={isSuccessInfoTooltipStatus}
                isOpen={isInfoTooltipOpen}
                onClose={closeAllPopups} />
              <EditProfilePopup
                isLoading={isEditProfileLoading}
                onUpdateUser={handleUpdateUser}
                onClose={closeAllPopups}
                isOpen={isEditProfilePopupOpen}
                formName={'edit'}
                title={'Редактировать профиль'}
                buttonText={'Сохранить'}
              />
              <AddPlacePopup
                isLoading={isAddPlaceLoading}
                submitHandler={handleAddPlaceSubmit}
                onClose={closeAllPopups}
                isOpen={isAddPlacePopupOpen}
                name={'add'}
                title={'Новое место'}
                buttonText={'Создать'} >
              </AddPlacePopup>
              <DeleteCardPopup
                isLoading={isCardDeleteLoading}
                onSubmit={handleCardDelete}
                isOpen={isDeleteCardPopupOpen}
                onClose={closeAllPopups}
                name={'delete'}
                title={'Вы уверены?'}
                buttonText={'Да'} />
              <EditAvatarPopup
                isLoading={isEditAvatarLoading}
                onUpdateAvatar={handleUpdateAvatar}
                onClose={closeAllPopups}
                isOpen={isEditAvatarPopupOpen}
                name={'avatar'}
                title={'Обновить аватар'}
                buttonText={'Сохранить'}
              />
              <PopupImage card={isImagePopupOpen} onClose={closeAllPopups} />
            </div>
          </AppContext.Provider>
        </CardContext.Provider>
      </CardsContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
