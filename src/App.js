import "./App.css";
import SignUp from "./components/signUp/SignUp";
import SignIn from "./components/SignIn/SignIn";
import FileUpload from "./components/fileUpload/FileUpload";
import { ToastContainer } from "react-toastify";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/upload-file" element={<FileUpload />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
