import { Outlet } from 'react-router-dom';
import Header from './Header';
import ThrowError from './ThrowError';

const RootLayout = () => (
  <div className="container mx-auto px-4 pb-20">
    <Header className="my-10">
      <h1 className="text-3xl font-bold text-slate-400">Music Album Searcher</h1>
      <ThrowError />
    </Header>
    <Outlet />
  </div>
);

export default RootLayout;
