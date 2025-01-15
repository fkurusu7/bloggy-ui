import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../context/useContextTypes';

function PrivateRoute() {
  const { currentUser } = useAppSelector((state) => state.user);
  // console.log('****===> CurrentUser:', currentUser);
  /*{
    "success": true,
    "data": {
      "username": "fer",
      "email": "fer@test.com",
      "createdAt": "2025-01-11T05:35:16.438Z"
    }
  }*/

  return currentUser ? <Outlet /> : <Navigate to={'/signin'} />;
}

export default PrivateRoute;
