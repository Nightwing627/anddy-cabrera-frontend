export const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  export function SetRowNumber(id, data) {
    return data.findIndex((obj) => obj.id === id);
  }

  export function EndPoint(api) {
  return ( 
      "http://ec2-54-211-0-191.compute-1.amazonaws.com:8000/api/v1/"+api
   );
}