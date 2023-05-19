import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import FilterGroup from '../FilterGroup'
import JobCard from '../JobCard'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  noData: 'NO_Data',
}

class Jobs extends Component {
  state = {
    jobsList: [],
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
    activeEmploymentType: 'FULLTIME,PARTTIME',
    activeSalaryRange: '1000000',
  }

  componentDidMount = () => {
    this.getAllJobs()
  }

  getAllJobs = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const {searchInput, activeEmploymentType, activeSalaryRange} = this.state
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${activeEmploymentType}&minimum_package=${activeSalaryRange}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      if (data.total === 0) {
        this.setState({apiStatus: apiStatusConstants.noData})
      } else {
        const gotData = data.jobs.map(each => ({
          companyLogoUrl: each.company_logo_url,
          employmentType: each.employment_type,
          id: each.id,
          jobDescription: each.job_description,
          location: each.location,
          packagePerAnnum: each.package_per_annum,
          rating: each.rating,
          title: each.title,
        }))
        this.setState({
          jobsList: gotData,
          apiStatus: apiStatusConstants.success,
        })
      }
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderProductsListView = () => {
    const {jobsList} = this.state
    const {salaryRangesList, employmentTypesList} = this.props
    console.log(salaryRangesList)
    console.log(jobsList)
    console.log(employmentTypesList)

    return (
      <div className="all-products-container">
        <ul className="products-list">
          {jobsList.map(job => (
            <JobCard eachJobData={job} key={job.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderNodataView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1> No Jobs Found </h1>
      <p> We cannot not find any jobs. Try other filters. </p>
    </div>
  )

  renderFailureView = () => (
    <div className="filerview-of-products">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1> Oops! something went wrong </h1>
      <p> We cannot seem to find the page you are looking for </p>
      <button type="button" onClick={this.getAllJobs}>
        Retry
      </button>
    </div>
  )

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderAllJobsList = () => <h1> main </h1>

  renderAllJobs = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderAllJobsList()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.noData:
        return this.renderNodataView()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <FilterGroup />
        {this.renderAllJobs()}
      </div>
    )
  }
}

export default Jobs
