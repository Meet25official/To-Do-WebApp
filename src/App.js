import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import New from "./components/NewModal/New";
import Day from "./pages/day/Day";
import MyCalendar from "./pages/calendar/MyCalendar";
import Sticky from "./pages/sticky/Sticky";
import Welcome from "./pages/welcome/Welcome";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
const App = () => {
  return (
    <Router>
    <div style={{backgroundColor:"#f8f9fa"}}>
     <Routes>
      <Route path="*" element={<Welcome/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/day" element={<Day/>}/>
      <Route path="/calendar" element={<MyCalendar/>}/>
      <Route path="/sticky" element={<Sticky/>}/>
      <Route path="register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
     </Routes>
    </div>
    </Router>
  );
};

export default App;
