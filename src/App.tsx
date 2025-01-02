import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      <Route path="/" element={<App />} />
    </Routes>
    </>
  )
}

export default App
