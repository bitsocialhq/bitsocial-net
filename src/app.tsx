import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/home"
import Docs from "./pages/docs"
import Apps from "./pages/apps"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/apps" element={<Apps />} />
      </Routes>
    </Router>
  )
}

export default App
