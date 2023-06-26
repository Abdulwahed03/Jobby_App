import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import JobbyContext from '../../context/JobbyContext'
import './index.css'

const JobCard = props => (
  <JobbyContext.Consumer>
    {value => {
      const {updatingTheTitle} = value
      const {jobsData} = props
      const {
        companyLogoUrl,
        employmentType,
        jobDescription,
        id,
        location,
        packagePerAnnum,
        rating,
        title,
      } = jobsData

      const jobItemTitle = () => {
        updatingTheTitle(title)
      }

      return (
        <li className="job-card-each" onClick={jobItemTitle}>
          <Link to={`/jobs/${id}`}>
            <div className="role-container">
              <img
                src={companyLogoUrl}
                alt="company logo"
                className="job-card-logo"
              />
              <div className="job-card-title-container">
                <h1 className="main-title-heading"> {title} </h1>
                <div className="jobCard-star-container">
                  <AiFillStar className="star" />
                  <p className="main-title-para"> {rating} </p>
                </div>
              </div>
            </div>
            <div className="package-container">
              <div className="role-sub-container">
                <div className="role-logo-container">
                  <MdLocationOn className="small-icons" />
                  <p className="main-title-para"> {location} </p>
                </div>
                <div className="role-logo-container">
                  <BsFillBriefcaseFill className="small-icons" />
                  <p className="main-title-para"> {employmentType} </p>
                </div>
              </div>
              <h1 className="main-title-heading-package">{packagePerAnnum}</h1>
            </div>
            <hr className="card-line" />
            <div className="job-description-container">
              <h1 className="main-title-heading"> Description </h1>
              <p className="main-title-para"> {jobDescription} </p>
            </div>
          </Link>
        </li>
      )
    }}
  </JobbyContext.Consumer>
)

export default JobCard
