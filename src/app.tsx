import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/home"
import Docs from "./pages/docs"
import Apps from "./pages/apps"
import About from "./pages/about"
import Blog from "./pages/blog"
import Status from "./pages/status"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/apps" element={<Apps />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/status" element={<Status />} />
      </Routes>
    </Router>
  )
}

export default App
