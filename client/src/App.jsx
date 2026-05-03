import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import { Routes, Route } from 'react-router-dom'
import { BrowserRouter as Router} from 'react-router-dom';
import DeveloperDashboard from './pages/DeveloperDashboard'
import CompanyDashboard from './pages/CompanyDashboard'
import DeveloperProfile from './pages/DeveloperProfile'
import LandingPage from './pages/LandingPage';
import ProtectedRoute from './components/ProtectedRoute';
import CompanyProfile from './pages/CompanyProfile';

function App() {
 

  return (
  <>
  <Router>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/*protected */}

      <Route path="/developer" element={
        <ProtectedRoute role="developer"> 
          <DeveloperDashboard /> 
        </ProtectedRoute>
        } />
      <Route path="/company" element={
        <ProtectedRoute role="company">
          <CompanyDashboard />
        </ProtectedRoute>
        } />
      <Route path="/developer/profile" element={
        <ProtectedRoute role="developer">
          <DeveloperProfile />
        </ProtectedRoute>
      } />
      <Route path="/company/profile"
        element = {
          <ProtectedRoute role="company">
            <CompanyProfile />
          </ProtectedRoute>
        } />

      {/*404 */}
      <Route path='*' element={<h1>404 Not Found</h1>} />
    </Routes> 
  </Router>
  

  </>
  )
}

export default App
