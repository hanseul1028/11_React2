import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./component/Common/Header/Header";
import Home from "./component/Common/Home/Home";
import Footer from "./component/Common/Footer/Footer";
import { Route, Routes } from "react-router-dom";
import Join from "./component/Member/Join/Join";
import Login from "./component/Member/Login/Login";
import { AuthProvider } from "./component/Common/context/AuthContext";
import Info from "./component/Member/Info/info";
import BoardList from "./component/Board/BoardList";
import BoardForm from "./component/Board/BoardForm";
import BoardDetail from "./component/Board/BoardDetail";


function App() {
  return (
    <>

    <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/join" element={<Join />} />
          <Route path="/login" element={<Login />} />
          <Route path="/info" element={<Info />} />
          <Route path="/boards" element={<BoardList />} />
          <Route path="/boardForm" element={<BoardForm />} />
          <Route path="/boards/:id" element={<BoardDetail />} />
        </Routes>
        <Home />
        <Footer />
    </AuthProvider>
    </>
  );
}
export default App;