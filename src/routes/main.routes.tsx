import { BrowserRouter, Routes, Route } from "react-router-dom"

import Error from "../pages/Error/Error";
import Home from "../pages/Home/Home";

export default function RoutesApp(){
  return(
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="*" element={<Error/>}/>
      </Routes>
    </BrowserRouter>
  );
}