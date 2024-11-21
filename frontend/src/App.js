//import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import Home from "./components/home";
import MyAds from "./components/ads/listMyAds";
import NotFound from "./components/layout/notFound";
import SignIn from "./components/auth/signIn";

import PrivateRoute from "./components/auth/PrivateRoute";

import "./index.css";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path="Technology" element={<MyAds/>} />
          <Route path="Home_kitchen" element={<Home />} />
          <Route path="Video_games" element={<Home />} />
          <Route path="Musical_instruments" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="MyAds" element={
                        <PrivateRoute>
                            <MyAds/>
                        </PrivateRoute>} />
        </Route>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
