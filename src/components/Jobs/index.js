import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'

import FilterGroup from '../FilterGroup'
import Header from '../Header'
import JobCard from '../JobCard'

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
    activeEmploymentType: ['FULLTIME', 'PARTTIME', 'INTERNSHIP', 'FREELANCE'],
    activeSalaryRange: '1000000',
  }

  componentDidMount = () => {
    this.getAllJobs()
  }

  getAllJobs = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const {searchInput, activeEmploymentType, activeSalaryRange} = this.state
    const employmentValues = activeEmploymentType.join(',')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentValues}&minimum_package=${activeSalaryRange}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.jobs.map(job => ({
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        jobDescription: job.job_description,
        id: job.id,
        location: job.location,
        packagePerAnnum: job.package_per_annum,
        rating: job.rating,
        title: job.title,
      }))
      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="products-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="products-failure-img"
      />
      <h1 className="product-failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="products-failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button type="button" onClick={this.getAllJobs}>
        Retry
      </button>
    </div>
  )

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getAllJobs()
    }
  }

  changeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  renderSearchInput = () => {
    const {searchInput} = this.state

    return (
      <div className="search-input-container">
        <input
          value={searchInput}
          type="search"
          className="search-input"
          placeholder="Search"
          onChange={this.changeSearchInput}
          onKeyDown={this.onEnterSearchInput}
        />
        <button
          data-testid="searchButton"
          onClick={this.getAllJobs}
          className="search-button-style"
          type="button"
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  renderAllJobsListView = () => {
    const {jobsList} = this.state
    const shouldShowProductsList = jobsList.length > 0

    return shouldShowProductsList ? (
      <div className="all-products-container">
        {this.renderSearchInput()}
        <ul className="products-list">
          {jobsList.map(eachJob => (
            <JobCard jobsData={eachJob} key={eachJob.id} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="no-products-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          className="no-products-img"
          alt="no jobs"
        />
        <h1 className="no-products-heading">No Jobs Found</h1>
        <p className="no-products-description">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    )
  }

  renderAllJobs = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderAllJobsListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  changeEmploymentType = (checkEl, activeEmploymentTypeValue) => {
    const {activeEmploymentType} = this.state

    if (checkEl) {
      if (activeEmploymentType.length < 4) {
        const unpackedList = [...activeEmploymentType]
        unpackedList.push(activeEmploymentTypeValue)
        console.log(unpackedList)
        this.setState({activeEmploymentType: unpackedList}, this.getAllJobs)
      } else if (activeEmploymentType.length === 4) {
        const unpackedList = [activeEmploymentTypeValue]
        this.setState({activeEmploymentType: unpackedList}, this.getAllJobs)
      }
    } else if (checkEl === false) {
      if (activeEmploymentType.length === 1) {
        const unpackedList = ['FULLTIME', 'PARTTIME', 'INTERNSHIP', 'FREELANCE']
        this.setState({activeEmploymentType: unpackedList}, this.getAllJobs)
      } else if (activeEmploymentType.length <= 4) {
        const ind = activeEmploymentType.indexOf(activeEmploymentTypeValue)
        const unpackedList = [...activeEmploymentType]
        unpackedList.splice(ind, 1)
        console.log(unpackedList)
        this.setState({activeEmploymentType: unpackedList}, this.getAllJobs)
      }
    }
  }

  changeSalaryRange = activeSalaryRangeData => {
    console.log('Triggered')
    this.setState({activeSalaryRange: activeSalaryRangeData}, this.getAllJobs)
  }

  render() {
    return (
      <>
        <Header />
        <div className="all-products-section">
          <FilterGroup
            changeEmploymentType={this.changeEmploymentType}
            changeSalaryRange={this.changeSalaryRange}
          />
          {this.renderAllJobs()}
        </div>
      </>
    )
  }
}

export default Jobs
