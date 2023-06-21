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
              <div className="jobCard-title-container">
                <h1> {title} </h1>
                <div className="jobCard-star-container">
                  <AiFillStar />
                  <p> {rating} </p>
                </div>
              </div>
            </div>
            <div className="package-container">
              <div className="role-container">
                <div className="role-container">
                  <MdLocationOn />
                  <p> {location} </p>
                </div>
                <div className="role-container">
                  <BsFillBriefcaseFill />
                  <p> {employmentType} </p>
                </div>
              </div>
              <h1> {packagePerAnnum} </h1>
            </div>
            <hr />
            <div className="job-description-container">
              <h1> Description </h1>
              <p> {jobDescription} </p>
            </div>
          </Link>
        </li>
      )
    }}
  </JobbyContext.Consumer>
)

export default JobCard
