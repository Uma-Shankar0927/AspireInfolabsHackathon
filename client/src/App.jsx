import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import {
  Navbar,
  SignUp,
  Login,
  Home,
  PasswordChange,
  HomeForm,
  Userdetail,
  UserData,
  PostDetail,
  UpdateForm
} from "./components/index";

const App = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const useremail = JSON.parse(localStorage.getItem("email"));
    if (!useremail) {
      navigate("/");
    }
  }, []);
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Signup" element={<SignUp />} />
        <Route path="/Home" element={<Home />} />
        <Route path='/HomeForm/:id' element={<HomeForm/>}/>
        <Route path="/passwordChange" element={<PasswordChange />} />
        <Route path="/userdetail" element={<Userdetail />} />
        <Route path="/userdata/:id" element={<UserData />} />
        <Route path='/postdetail/:id' element={<PostDetail/>}/>
        <Route path='/UpdateForm/:id' element={<UpdateForm/>}/>
      </Routes>
    </div>
  );
};

export default App;
