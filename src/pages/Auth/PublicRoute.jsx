import { Navigate } from "react-router-dom";


export const PrivateRoute = ({ children }) => {
  var isAuthenticated = localStorage.getItem("accessToken");
      
  if (!isAuthenticated ) {
    return children
  }
    
  return <Navigate to="/solutions" />
}

export default PrivateRoute;