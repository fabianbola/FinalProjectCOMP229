//import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import Home from "./components/home";
import MyAds from "./components/ads/listMyAds";
import NotFound from "./components/layout/notFound";
import SignIn from "./components/auth/signIn";
import Register from "./components/auth/signUp";
import ListUsers from "./components/users/listUsers";
import MyAccount from "./components/accounts/account";
import MyQuestions from "./components/questions/listMyQuestions";

import PrivateRoute from "./components/auth/PrivateRoute";

import "./index.css";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path="Technology" element={<Home/>} />
          <Route path="Home_kitchen" element={<Home />} />
          <Route path="Video_games" element={<Home />} />
          <Route path="Musical_instruments" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="MyUser/Ads" element={
                        <PrivateRoute>
                            <MyAds/>
                        </PrivateRoute>} />
          <Route path="MyUser/ListUsers" element={
          <PrivateRoute>
              <ListUsers/>
          </PrivateRoute>} />
          <Route path="MyUser/MyAccount" element={
          <PrivateRoute>
              <MyAccount/>
          </PrivateRoute>} />
          <Route path="MyUser/MyQuestions" element={
          <PrivateRoute>
              <MyQuestions/>
          </PrivateRoute>} />
          <Route path="Register" element={<Register />} />
          
        </Route>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
