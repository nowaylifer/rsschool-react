import { PropsWithChildren } from 'react';

const Box = ({ children }: PropsWithChildren) => {
  return <div className="mb-6 rounded bg-white p-4 px-4 shadow-lg md:p-8">{children}</div>;
};

export default Box;
