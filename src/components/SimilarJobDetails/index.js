import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobDetails = props => {
  const {cardDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = cardDetails

  return (
    <li>
      <div className="Similar-role-container">
        <img src={companyLogoUrl} alt="similar job company logo" />
        <div>
          <h1> {title} </h1>
          <div>
            <AiFillStar />
            <p> {rating} </p>
          </div>
        </div>
      </div>
      <h1> Description </h1>
      <p> {jobDescription} </p>
      <div className="similar-location-container">
        <div>
          <MdLocationOn />
          <p> {location} </p>
        </div>
        <div>
          <BsFillBriefcaseFill />
          <p> {employmentType} </p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobDetails
