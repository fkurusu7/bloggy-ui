import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../context/useContextTypes';

function PrivateRoute() {
  const { currentUser } = useAppSelector((state) => state.user);
  console.log('****===> CurrentUser:', currentUser);

  return currentUser ? <Outlet /> : <Navigate to={'/signin'} />;
}

export default PrivateRoute;
