import './App.css'
import { Route, Routes, BrowserRouter, Navigate } from 'react-router'
import Home from './pages/Home'
import CreatePoll from './Pages/CreatePoll'
import Footer from './Components/Footer'
import PollList from './Pages/PollList'
import AdminLayout from './Components/Admin/AdminLayout'
import OverviewView from './Pages/Admin/OverviewView'
import ElectionsView from './Pages/Admin/ElectionsView'
import SystemNodesView from './Pages/Admin/SystemNodesView'
import AuditCenterView from './Pages/Admin/AuditCenterView'
import PollDetails from './Pages/PollDetails'
import PollResults from './Pages/PollResults'
import NotFound from './Pages/NotFound'
import Signup from './Pages/Signup'
import Profile from './Pages/Profile'
import { Web3Provider } from './context/Web3Context'
import WalletPickerModal from './Components/WalletPickerModal'


function App() {

  return <>
    <Web3Provider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/pollList' element={<PollList />} />
          <Route path='/createPoll' element={<CreatePoll />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/poll/:id' element={<PollDetails />} />
          <Route path='/poll/:id/results' element={<PollResults />} />
          <Route path='/profile' element={<Profile />} />

          <Route path='/admin-v2' element={<AdminLayout />}>
            <Route index element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<OverviewView />} />
            <Route path="elections" element={<ElectionsView />} />
            <Route path="system" element={<SystemNodesView />} />
            <Route path="audit" element={<AuditCenterView />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <WalletPickerModal />
    </Web3Provider>
    <Footer />
  </>
}

export default App
