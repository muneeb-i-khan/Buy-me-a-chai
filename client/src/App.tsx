import { Routes, Route } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import ProfilePage from './components/ProfilePage'
import FundingPage from './components/FundingPage'

const App:React.FC = () => {
  return (
  <Routes>
    <Route path='/' element={<LandingPage />} />
    <Route path="/profile" element={<ProfilePage />}/>
    <Route path="/funding" element={<FundingPage />}/>
  </Routes>
  )
}

export default App