import { Outlet } from "react-router-dom";
import Header from "../../common/Header";



function MainPage() {
  return (
    <>
      <Header/>
      
      <Outlet />
     
    </>
  );
}

export default MainPage;