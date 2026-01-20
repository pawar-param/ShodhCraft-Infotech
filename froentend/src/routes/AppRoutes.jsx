import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Career from '../pages/Career'
import About from '../pages/About'
import Contact from '../pages/Contact'
import ApplyForm from '../pages/ApplyForm' // new import
import AdminPanel from '../pages/AdminPanel' // new import
import AuthForm from '../components/AuthForm'

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/career" element={<Career />} />
    <Route path="/apply/:jobId" element={<ApplyForm />} /> {/* job-specific apply route */}
    <Route path="/auth/*" element={<AuthForm />} />
    <Route path="/admin" element={<AdminPanel />} />
  </Routes>
)

export default AppRoutes
