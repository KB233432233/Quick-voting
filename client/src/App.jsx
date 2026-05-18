import './App.css'
import { Route, Routes, BrowserRouter, Navigate } from 'react-router'
import Home from './pages/Home'
import CreatePoll from './Pages/CreatePoll'
import Layout from './Components/Layout'
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
import ProtectedRoute from './Components/ProtectedRoute'
import UnAuthorized from './Pages/UnAuthorized'

function App() {

  return <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route element={<Layout />}>
            <Route path='/pollList' element={<PollList />} />

            <Route path='/createPoll' element={
              <ProtectedRoute allowedRoles={['Organization']}>
                <CreatePoll />
              </ProtectedRoute>
            } />
            <Route path='/poll/:id' element={<PollDetails />} />
            <Route path='/poll/:id/results' element={<PollResults />} />
            <Route path='/profile' element={<Profile />} />

            <Route path='/orgRegister' element={
              <ProtectedRoute allowedRoles={['User', 'Guest']}>
                <OrgRegistration />
              </ProtectedRoute> } />
          
          {/* Protected Dashboard Routes */}
          <Route path='/orgDashboard' element={
            <ProtectedRoute allowedRoles={['Organization']}>
              <OrgDashboard />
            </ProtectedRoute>
          } />
          
          <Route path='/auditorDashboard' element={
            <ProtectedRoute allowedRoles={['Auditor']}>
              <AuditorDashboard />
            </ProtectedRoute>
          } />

          {/* Protected Admin Routes */}
          <Route path='/admin-v2' element={
            <ProtectedRoute allowedRoles={['Owner']}>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="organizations" replace />} />
            <Route path="organizations" element={<OrganizationsView />} />
            <Route path="auditors" element={<AuditorsView />} />
            <Route path="polls" element={<PollsView />} />
          </Route>
        </Route>

        <Route path='/signup' element={<Signup />} />
        <Route path='/unauthorized' element={<UnAuthorized />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </>
}

export default App
