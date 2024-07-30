import { Outlet } from 'react-router-dom';

function layout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default layout;
