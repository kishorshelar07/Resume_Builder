import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./components/sidebar/Sidebar";
import "./App.css";
import ResumeForm from './components/resume_details/ResumeForm';
import ResumeTable from './components/resume_details/ResumeTable';


function App() {
  
  return (
    <div className="container">
      <Sidebar />
      
      <ResumeForm onAddSuccess={() => window.location.reload()} />
      <ResumeTable />
    </div>
  );
}

export default App;
