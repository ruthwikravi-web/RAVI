import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import Login from './pages/Login'
import ContactPage from './pages/ContactPage'
import ShoutBoxPage from './pages/ShoutBoxPage'
import GuestbookPage from './pages/GuestbookPage'
import AdminPage from './pages/AdminPage'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/shoutbox" element={<ShoutBoxPage />} />
      <Route path="/guestbook" element={<GuestbookPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
