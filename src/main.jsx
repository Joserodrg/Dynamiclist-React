import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import { Routes } from "react-router-dom"
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
  
)
// ReactDOM.createRoot(root).render(
//   <BrowserRouter>
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="dashboard" element={<Dashboard />}>
//         <Route index element={<RecentActivity />} />
//         <Route path="project/:id" element={<Project />} />
//       </Route>
//     </Routes>
//   </BrowserRouter>
// );