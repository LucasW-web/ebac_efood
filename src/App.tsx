import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Home from './pages/Home'
import Perfil from './pages/Perfil'
import Footer from './components/Footer'
import { store } from './store'
import { Provider } from 'react-redux'
import Cart from './components/Cart'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/perfil/:id" element={<Perfil />} />
        </Routes>
        <Footer />
        <Cart />
        <ToastContainer position="bottom-right" autoClose={3000} />
      </BrowserRouter>
    </Provider>
  )
}

export default App
