import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import GettingStarted from './pages/docs/GettingStarted'
import Tokens from './pages/docs/Tokens'
import Components from './pages/docs/Components'
import Tools from './pages/docs/Tools'

export default function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/docs" element={<GettingStarted />} />
        <Route path="/docs/tokens" element={<Tokens />} />
        <Route path="/docs/components" element={<Components />} />
        <Route path="/docs/tools" element={<Tools />} />
      </Routes>
      <Footer />
    </>
  )
}
