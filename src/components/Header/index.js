import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import {Link, withRouter} from 'react-router-dom'
import './index.css'
import Cookies from 'js-cookie'

const Header = props => {
  const loggingOut = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="nav-header">
      <div className="mobile-header-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="mobile-main-logo"
          />
        </Link>
        <div className="mobile-header-icon-container">
          <ul className="header-list-container">
            <li>
              <Link to="/">
                <AiFillHome className="mobile-icons" />
              </Link>
            </li>
            <li>
              <Link to="/jobs">
                <BsFillBriefcaseFill className="mobile-icons" />
              </Link>
            </li>
          </ul>
          <button
            className="logout-btn-mobile"
            type="button"
            onClick={loggingOut}
          >
            <FiLogOut className="mobile-icons" />
          </button>
        </div>
      </div>

      <div className="large-header-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="header-main-logo"
          />
        </Link>
        <ul className="header-list-container">
          <li>
            <Link to="/" className="header-home-text">
              Home
            </Link>
          </li>
          <li>
            <Link to="/jobs" className="header-home-text">
              Jobs
            </Link>
          </li>
        </ul>
        <button className="logout-btn" type="button" onClick={loggingOut}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default withRouter(Header)
