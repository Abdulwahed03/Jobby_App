import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    jobsList: [],
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
    activeEmploymentType: '',
    activeSalaryRange: '',
  }

  componentDidMount = () => {
    this.getAllJobs()
  }

  getAllJobs = async () => {
    this.setState = {apiStatus: apiStatusConstants.inProgress}

    const jwtToken = Cookies.get('jwt_token')
    const {searchInput, activeEmploymentType, activeSalaryRange} = this.state
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${activeEmploymentType}&minimum_package=${activeSalaryRange}&search=${searchInput}`
    const options = {
      header: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
  }

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderAllJobs = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderAllJobsList()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    return <div>{this.renderAllJobs()}</div>
  }
}

export default Jobs
