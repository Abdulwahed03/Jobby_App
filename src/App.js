import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginPage from './components/LoginPage'
import ProtectedRoute from './components/ProtectedRoute'
import Jobs from './components/Jobs'
import Home from './components/Home'
import NotFound from './components/NotFound'

import './App.css'
import JobItemDetails from './components/JobItemDetails'
import JobbyContext from './context/JobbyContext'

// These are the lists used in the application. You can move them to any component needed.
const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class App extends Component {
  state = {
    initialEmploymentTypesList: employmentTypesList,
    initialSalaryRangesList: salaryRangesList,
    jobTitle: '',
  }

  updatingTheTitle = title => {
    this.setState({jobTitle: title})
    console.log(title)
  }

  render() {
    const {
      initialEmploymentTypesList,
      initialSalaryRangesList,
      updatingTheTitle,
    } = this.state
    return (
      <JobbyContext.Provider
        value={{
          initialEmploymentTypesList,
          initialSalaryRangesList,
          updatingTheTitle: this.updatingTheTitle,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute
            exact
            path="/jobs"
            component={Jobs}
            salaryRangesList={salaryRangesList}
            employmentTypesList={employmentTypesList}
          />
          <ProtectedRoute exact path="/jobs/:id" component={JobItemDetails} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </JobbyContext.Provider>
    )
  }
}

export default App
