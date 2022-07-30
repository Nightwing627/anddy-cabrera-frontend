import React from "react";
import { BrowserRouter } from "react-router-dom";

import "./App.css";
import RauteApp from "./RouteApp";

function App() {
  const handleScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <BrowserRouter>
      <RauteApp />
    </BrowserRouter>
  );
}
export default App;
