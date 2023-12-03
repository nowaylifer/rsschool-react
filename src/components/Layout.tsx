import { Outlet, Link } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="container mx-auto max-w-screen-lg">
      <div className="mb-4 flex items-center justify-center gap-5">
        <Link to="uncontrolled-form">Uncontrolled Form</Link>
        <Link to="hook-form">React Hook Form</Link>
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
