import { Navigate } from "react-router-dom";


export const PublicRoute = ({ children }) => {
  var isAuthenticated = localStorage.getItem("accessToken");
      
  if (isAuthenticated ) {
    return children
  }
    
  return <Navigate to="/login" />
}

export default PublicRoute;