import { BrowserRouter, Routes, Route } from "react-router-dom"

import Error from "../ui/pages/Error/Error";
import Home from "../ui/pages/Home";

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
