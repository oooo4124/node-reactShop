import React, { Suspense } from 'react';
import { Route, Routes } from "react-router-dom";
import Auth from "../hoc/auth";

import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import UploadProductPage from "./views/UploadProductPage/UploadProductPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer"
import DetailProductPage from './views/DetailProductPage/DetailProductPage';
import CartPage from './views/CartPage/CartPage';
import HistoryPage from './views/HistoryPage/HistoryPage';


function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Routes>
          <Route exact path="/" element={Auth(LandingPage, null)} />
          <Route exact path="/login" element={Auth(LoginPage, false)} />
          <Route exact path="/register" element={Auth(RegisterPage, false)} />
          <Route exact path="/product/upload" element={Auth(UploadProductPage, true)} />
          <Route exact path="/product/:productId" element={Auth(DetailProductPage, null)} />
          <Route exact path="/user/cart" element={Auth(CartPage, true)} />
          <Route exact path="/history" element={Auth(HistoryPage, true)} />
        </Routes>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;