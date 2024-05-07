
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Header from './components/Header'
import SignUp from './components/SignUp'
function App() {

  return (
  <BrowserRouter>
  <Header/>
  <Routes>
  <Route path='/signup'  element={<SignUp/>}/>
  </Routes>
  </BrowserRouter>
  )
}

export default App
