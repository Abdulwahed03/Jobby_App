import React from 'react'

const JobbyContext = React.createContext({
  initialEmploymentTypesList: [],
  initialSalaryRangesList: [],
  jobTitle: '',
  updatingTheTitle: () => {},
})

export default JobbyContext
