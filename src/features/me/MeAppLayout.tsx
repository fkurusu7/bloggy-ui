import { Outlet } from 'react-router-dom';

function MeAppLayout() {
  return (
    <div className="container-me">
      <Outlet />
    </div>
  );
}

export default MeAppLayout;
