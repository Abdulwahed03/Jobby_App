import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'

import './index.css'

class FiltersGroup extends Component {
  state = {
    userProfileData: {},
  }

  renderSalaryFiltersList = () => {
    const {salaryRangesList} = this.props

    return salaryRangesList.map(salary => {
      const {changeSalaryRange} = this.props

      checkedTheSalaryInput = () => {
        if (salary.salaryRangeId.checked) {
          changeSalaryRange(salary.salaryRangeId)
        }
      }

      return (
        <li
          className="salary-type-item"
          key={salary.salaryRangeId}
          onClick={this.checkedTheSalaryInput}
        >
          <input type="radio" id={salary.salaryRangeId} />
          <label htmlFor={salary.salaryRangeId}> {salary.label} </label>
        </li>
      )
    })
  }

  renderRatingsFilters = () => (
    <div>
      <h1 className="rating-heading">Rating</h1>
      <ul className="ratings-list">{this.renderSalaryFiltersList()}</ul>
    </div>
  )

  renderEmployeeList = () => {
    const {employmentTypesList} = this.props

    return employmentTypesList.map(employment => {
      const {changeEmploymentType} = this.props

      checkedTheInput = () => {
        const CheckedEl = false
        if (employment.employmentTypeId.checked) {
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
          onClick={this.checkedTheInput}
        >
          <input type="checkbox" id={employment.employmentTypeId} />
          <label htmlFor={employment.employmentTypeId}>
            {employment.label}
          </label>
        </li>
      )
    })
  }

  renderProductCategories = () => (
    <>
      <h1 className="category-heading"> Type Of Employment </h1>
      <ul className="categories-list">{this.renderEmployeeList()}</ul>
    </>
  )

  updatingUserData = () => {
    const {userProfileData} = this.state

    return (
      <div className="profile-background">
        <img src={userProfileData.profileImageUrl} alt={userProfileData.name} />
        <h1> {userProfileData.name} </h1>
        <p> {userProfileData.shortBio} </p>
      </div>
    )
  }

  userProfileDataFailure = () => (
    <div className="failure-details">
      <button type="button"> Retry </button>
    </div>
  )

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
      this.setState({userProfileData: updatedData})
      this.updatingUserData()
    } else {
      this.userProfileDataFailure()
    }
  }

  render() {
    return (
      <div className="filters-group-container">
        {this.renderProfileDetails()}
        {this.renderProductCategories()}
        {this.renderRatingsFilters()}
      </div>
    )
  }
}

export default FiltersGroup
