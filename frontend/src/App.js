//import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import Home from "./components/home";
//import Projects from "./components/Projects";
//import About from "./components/About";
import NotFound from "./components/layout/notFound";
//import ListInventory from "./components/inventory/ListInventory";


//import "bootstrap/dist/css/bootstrap.min.css";
//import "@fortawesome/fontawesome-free/css/all.min.css"
import "./index.css";

//import "bootstrap/dist/js/bootstrap.bundle.min.js";
//import "@fortawesome/fontawesome-free/js/all.min.js"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path="inventory/list" element={<Home />} />
          <Route path="inventory/add" element={<Home />} />
          <Route path="projects" element={<Home />} />
          <Route path="about" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
