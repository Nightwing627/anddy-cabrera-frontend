import { Outlet } from "react-router-dom";
import NavBar from "../../common/NavBar";
import SideBar from "../../common/sideBar";
import Footer from "../../common/Footer";

const Dashboard = () => {
  const isAuthenticated = localStorage.getItem("accessToken");
  const handleScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      <div id="wrapper">
        <SideBar />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <NavBar />
            <Outlet />
          </div>
            <Footer />
        </div>
      </div>
      <a class="scroll-to-top rounded" onClick={() => handleScroll()}>
        <i class="fas fa-angle-up"></i>
      </a>
    </>
  );
};

export default Dashboard;
