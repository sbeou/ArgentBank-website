import './headerStyle.scss'
import Logo from "../../assets/argentBankLogo.webp"
import { Link, useNavigate } from 'react-router-dom'
import '../../utils/font-awesome-4.7.0/scss/font-awesome.scss'
import { UserProfile } from '../../utils/userProfile'

function Header() {
  const navigate = useNavigate()
  const jwt = localStorage.getItem("jwt")
  const { data } = UserProfile(jwt)
  const logout = () => {
    localStorage.removeItem("jwt")
    navigate("/signIn")
  }
  let menuLink
  if(jwt != null) {
    const userName = data.userName
    menuLink = 
      <>
      <Link className="main-nav-item" to={'/user'}>
        <i className="fa fa-user-circle"></i>
        {userName}
      </Link>
      <Link className="main-nav-item" onClick={logout}>
        <i className="fa fa-sign-out"></i>
        Sign Out
      </Link>
      </>
  }
  if(!jwt) {
    menuLink = 
      <Link className="main-nav-item" to={'/signIn'}>
        <i className="fa fa-user-circle"></i>
        Sign In
      </Link>
      
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