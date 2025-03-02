import { Routes, Route } from "react-router-dom";
import Projects from "./pages/Projects";
import NewProject from "./pages/NewProject";
import EditProject from "./pages/EditProject";
import './index.css'; 

const App = () => {
  return (
    <Routes>
      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/project" element={<NewProject />} />
      <Route path="/projects/edit/:id" element={<EditProject />} />
    </Routes>
  );
};

export default App;
