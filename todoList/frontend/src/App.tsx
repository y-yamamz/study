import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import { Layout } from "./pages/Layout";
import LoginPage from "./pages/LoginPage";
import MasterPage from "./pages/MasterPage";
import SideMenuPage from "./pages/SideMenuPage";
import TaskListPage from "./pages/TaskListPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/Layout" element={<Layout />}>
            <Route path="SideMenuPage" element={<SideMenuPage />} />
            <Route path="MasterPage" element={<MasterPage />} />
            <Route path="TaskListPage" element={<TaskListPage />} />
          </Route>
          
        </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
