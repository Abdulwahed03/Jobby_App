import {Component} from 'react'
import Header from '../Header'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {HiExternalLink} from 'react-icons/hi'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobDetails: {},
    similarJobsData: [],
  }

  componentDidMount = () => {
    this.getJobDetails()
  }

  gettingSimilarJobDetails = each => ({
    companyLogoUrl: each.companyLogoUrl,
    employmentType: each.employment_type,
    id: each.id,
    jobDescription: each.job_description,
    location: each.location,
    rating: each.rating,
    title: each.title,
  })

  fetchingJobDetails = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    skills: data.skills.map(each => ({
      imageUrl: each.image_url,
      name: each.name,
    })),
    lifeAtCompany: {
      description: data.life_at_company.description,
      imageUrl: data.life_at_company.image_url,
    },
    location: data.location,
    packagePerAnnum: data.package_per_annum,
    rating: data.rating,
  })

  getJobDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const responseData = await response.json()
      const updatedJobData = this.fetchingJobDetails(responseData.job_details)
      const similarJobDetails = responseData.similar_jobs.map(eachJob =>
        this.gettingSimilarJobDetails(eachJob),
      )
      this.setState({
        jobDetails: updatedJobData,
        similarJobsData: similarJobDetails,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderingFailureView = () => (
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
      <button type="button" onClick={this.getJobDetails}>
        Retry
      </button>
    </div>
  )

  renderingLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobDetails = () => {
    const {jobDetails, similarJobsData} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      id,
      jobDescription,
      skills,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
    } = jobDetails

    return (
      <div className="job-details-container">
        <div className="role-container">
          <img src={companyLogoUrl} alt="job details company logo" />
          <div>
            <h1> {title} </h1>
            <div>
              <AiFillStar />
              <p> {rating} </p>
            </div>
          </div>
        </div>
        <div className="package-container">
          <div>
            <div>
              <MdLocationOn />
              <p> {location} </p>
            </div>
            <div>
              <BsFillBriefcaseFill />
              <p> {employmentType} </p>
            </div>
          </div>
          <h1> {packagePerAnnum} </h1>
        </div>
        <hr />
        <div className="job-description-container">
          <div className="description-container">
            <div>
              <h1> Description </h1>
              <a href={companyWebsiteUrl}>
                Visit <HiExternalLink />
              </a>
            </div>
            <p> {jobDescription} </p>
          </div>
          <div className="skills-container">
            <h1> Skills </h1>
            <ul>
              {skills.map(each => (
                <li>
                  <img src={each.imageUrl} alt={each.name} />
                  <p> {each.name} </p>
                </li>
              ))}
            </ul>
          </div>
          <div className="life-at-company-container">
            <h1> Life at Company </h1>
            <div>
              <p> {lifeAtCompany.description} </p>
              <img src={lifeAtCompany.imageUrl} alt="life at company" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderTheDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetails()
      case apiStatusConstants.failure:
        return this.renderingFailureView()
      case apiStatusConstants.inProgress:
        return this.renderingLoaderView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-details-section">{this.renderTheDetails}</div>
      </>
    )
  }
}
