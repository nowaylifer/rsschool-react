import { Outlet, NavLink } from 'react-router-dom';

const classCallback = ({ isActive }: { isActive: boolean }) => (isActive ? 'font-bold' : '');

const Layout = () => {
  return (
    <div className="container mx-auto max-w-screen-lg">
      <div className="mb-4 flex items-center justify-center gap-5">
        <NavLink to="/" className={classCallback}>
          Main
        </NavLink>
        <NavLink to="uncontrolled-form" className={classCallback}>
          Uncontrolled Form
        </NavLink>
        <NavLink to="hook-form" className={classCallback}>
          React Hook Form
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
