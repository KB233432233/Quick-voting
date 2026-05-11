import './App.css'
import { Route, Routes, BrowserRouter, Navigate } from 'react-router'
import Home from './pages/Home'
import CreatePoll from './Pages/CreatePoll'
import Footer from './Components/Footer'
import PollList from './Pages/PollList'
import AdminLayout from './Components/Admin/AdminLayout'
import OrganizationsView from './Pages/Admin/OrganizationsView'
import AuditorsView from './Pages/Admin/AuditorsView'
import PollsView from './Pages/Admin/PollsView'
import PollDetails from './Pages/PollDetails'
import PollResults from './Pages/PollResults'
import NotFound from './Pages/NotFound'
import Signup from './Pages/Signup'
import Profile from './Pages/Profile'
import OrgRegistration from './Pages/OrgRegistration'
import OrgDashboard from './Pages/OrgDashboard/OrgDashboard'
import AuditorDashboard from './Pages/Auditor/AuditorDashboard'


function App() {

  return <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/pollList' element={<PollList />} />
        <Route path='/createPoll' element={<CreatePoll />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/poll/:id' element={<PollDetails />} />
        <Route path='/poll/:id/results' element={<PollResults />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/orgRegister' element={<OrgRegistration />} />
        <Route path='/orgDashboard' element={<OrgDashboard />} />
        <Route path='/auditorDashboard' element={<AuditorDashboard />} />

        <Route path='/admin-v2' element={<AdminLayout />}>
          <Route index element={<Navigate to="organizations" replace />} />
          <Route path="organizations" element={<OrganizationsView />} />
          <Route path="auditors" element={<AuditorsView />} />
          <Route path="polls" element={<PollsView />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    <Footer />
  </>
}

export default App
