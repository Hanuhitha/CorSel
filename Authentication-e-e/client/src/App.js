import React from "react";
import RegistrationForm from "./components/RegistrationForm";
import ViewStudentForm from "./components/ViewStudentForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/view-credentials" element={<ViewStudentForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
