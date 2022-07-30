import React from "react";
import {Route, Routes } from 'react-router-dom';
import TablePageComponent from "./pages/Panel/TableComp";
import MainPage from "./pages/MainPage.jpx/MainPage";
import PublicRoute from "./pages/Auth/PublicRoute";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Panel/Dashboard";
import PrivateRoute from "./pages/Auth/PrivateRoute";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ForgotSent from "./pages/Auth/ForgotSent";
import Forgot from "./pages/Auth/Forgot";
import Verification from "./pages/Auth/veriication";
import Verify from "./pages/Auth/Verify";
import Reset from "./pages/Auth/Reset";
import MainIndex from "./pages/Panel/MainIndex";
import SolutionDetail from "./pages/Panel/SolutionDetails";
import UpdateSolution from "./pages/Panel/UpdateSolution";

import MainPIndex from "./pages/Panel/MainPIndex";
import ProjectDetail from "./pages/Panel/ProjectDetails";
import UpdateProject from "./pages/Panel/UpdateProject";
import ProjectPageComponent from "./pages/Panel/ProjectComp";

const RauteApp = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage/>} >
        <Route index element={<Home/>}/>
        <Route path="verification" element={<Verification />} />
        <Route path='verify/:token' element={<Verify/>}/>
        <Route path='forgot-sent' element={<ForgotSent/>}/>
      </Route>
      <Route path="login" element={<PublicRoute><Login/></PublicRoute>} />
      <Route path="register" element={<PublicRoute><Register/></PublicRoute>} />
      <Route path='forgot' element={<Forgot/>}/>
      <Route path='reset/:token' element={<Reset/>}/>
      <Route path="/solutions" element={<PrivateRoute><Dashboard/></PrivateRoute>} >
        <Route index element={<MainIndex />} />
        <Route path="/solutions/solution-detail/:solution_id" element={<SolutionDetail />} />
        <Route path="/solutions/update-solution/:solution_id" element={<UpdateSolution />} />
      </Route>
      <Route path="/projects" element={<PrivateRoute><Dashboard/></PrivateRoute>}>
        <Route index element={<MainPIndex />} />
        <Route path="/projects/project-detail/:project_id" element={<ProjectDetail />} />
        <Route path="/projects/update-project/:project_id" element={<UpdateProject />} />
      </Route>      
    </Routes>
  );
};

export default RauteApp;
