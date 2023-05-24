import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobCard = props => {
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

  return (
    <li>
      <div className="role-container">
        <img src={companyLogoUrl} alt="company logo" />
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
        <h1> Description </h1>
        <p> {jobDescription} </p>
      </div>
    </li>
  )
}

export default JobCard
