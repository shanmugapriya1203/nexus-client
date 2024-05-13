
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Header from './components/Header'
import SignUp from './components/SignUp'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import UpdatePage from './pages/UpdatePage'
function App() {

  return (
  <BrowserRouter>
  <Header/>
  <Routes>
  <Route path='/signup'  element={<SignUp/>}/>
  <Route path='/login'  element={<Login/>}/>
  <Route path='/dashboard'  element={<Dashboard/>}/>
  <Route path='/profile'  element={<UpdatePage/>}/>
  </Routes>
  </BrowserRouter>
  )
}

export default App
