import { Navigate, Outlet } from 'react-router-dom';
import { useTokenVerification } from './useTokenVerification';

/*{
  "success": true,
  "data": {
    "username": "fer",
    "email": "fer@test.com",
    "createdAt": "2025-01-11T05:35:16.438Z"
  }
}*/

function PrivateRoute() {
  const { isTokenValid, isChecking } = useTokenVerification();

  // Show Loading indicator while checking token
  if (isChecking) {
    return <div>Verifying session...</div>;
  }

  // If token does not exist in redux or tiekn is invalid, redirect to /signin
  if (!isTokenValid) {
    return <Navigate to={'/signin'} />;
  }

  // return currentUser ? <Outlet /> : <Navigate to={'/signin'} />;
  // If user exists and token is valid, render the protected route
  return <Outlet />;
}

export default PrivateRoute;
