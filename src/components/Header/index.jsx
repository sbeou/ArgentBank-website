import './headerStyle.scss'
import Logo from "../../assets/argentBankLogo.webp"
import { Link, NavLink, useNavigate } from 'react-router-dom'
import '../../utils/font-awesome-4.7.0/scss/font-awesome.scss'
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserBytoken, userSelector, clearState } from '../../features/UserSlices';

function Header() {
  let token = localStorage.getItem("token")
  const navigate = useNavigate()
  const logout = () => {
    localStorage.removeItem("token")
    navigate("/signIn")
  }

  const dispatch = useDispatch();
  useEffect(() => {
    if(token != null) {
      dispatch(fetchUserBytoken({token: token}));
    }
  }, [dispatch, token]);
  const { isError, username, firstName } = useSelector(userSelector);
  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, [dispatch]);
  
  useEffect(() => {
    if (isError) {
      dispatch(clearState());
    }
  }, [isError, dispatch]);
  let menuLink
  if(token != null) {
    menuLink = 
      <>
      <NavLink activeclassname='active' className="main-nav-item" to={'/user'}>
        <i className="fa fa-user-circle"></i>
        {username != null ? (username) : (firstName)}
      </NavLink>
      <Link className="main-nav-item" onClick={logout}>
        <i className="fa fa-sign-out"></i>
        Sign Out
      </Link>
      </>
  }
  if(!token) {
    menuLink = 
      <NavLink activeclassname='active' className="main-nav-item" to={'/signIn'}>
        <i className="fa fa-user-circle"></i>
        Sign In
      </NavLink>
      
  }
    return (
        <nav className="main-nav">
        <Link className="main-nav-logo" to={'/'}>
          <img
            className="main-nav-logo-image"
            src={Logo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <div>
          {menuLink}
        </div>
      </nav>
    )
}
export default Header