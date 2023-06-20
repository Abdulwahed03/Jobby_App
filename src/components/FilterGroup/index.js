import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import JobbyContext from '../../context/JobbyContext'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class FilterGroup extends Component {
  state = {
    userProfileData: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount = () => {
    this.renderProfileDetails()
  }

  renderProfileDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const profileData = await response.json()
      const updatedData = {
        name: profileData.profile_details.name,
        profileImageUrl: profileData.profile_details.profile_image_url,
        shortBio: profileData.profile_details.short_bio,
      }
      this.setState({
        userProfileData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderEmployeeList = () => (
    <JobbyContext.Consumer>
      {value => {
        const {initialEmploymentTypesList} = value

        return initialEmploymentTypesList.map(employment => {
          const {changeEmploymentType} = this.props

          const checkedTheInput = event => {
            let CheckedEl = false
            if (event.target.checked) {
              CheckedEl = true
              changeEmploymentType(CheckedEl, employment.employmentTypeId)
            } else {
              CheckedEl = false
              changeEmploymentType(CheckedEl, employment.employmentTypeId)
            }
          }

          return (
            <li
              className="employment-type-item"
              key={employment.employmentTypeId}
            >
              <input
                type="checkbox"
                id={employment.employmentTypeId}
                onChange={checkedTheInput}
              />
              <label htmlFor={employment.employmentTypeId}>
                {employment.label}
              </label>
            </li>
          )
        })
      }}
    </JobbyContext.Consumer>
  )

  renderEmploymentCategories = () => (
    <>
      <h1 className="category-heading"> Type Of Employment </h1>
      <ul className="categories-list">{this.renderEmployeeList()}</ul>
    </>
  )

  updatingUserData = () => {
    const {userProfileData} = this.state

    return (
      <div className="profile-background">
        <img
          src={userProfileData.profileImageUrl}
          alt={userProfileData.name}
          className="profile-logo"
        />
        <h1 className="profile-user-name"> {userProfileData.name} </h1>
        <p className="profile-paragraph"> {userProfileData.shortBio} </p>
      </div>
    )
  }

  userProfileDataFailure = () => (
    <div className="failure-details">
      <button type="button"> Retry </button>
    </div>
  )

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderingTheCondition = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.updatingUserData()
      case apiStatusConstants.failure:
        return this.userProfileDataFailure()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="filters-group-container">
        {this.renderingTheCondition()}
        {this.renderEmploymentCategories()}
      </div>
    )
  }
}

export default FilterGroup
