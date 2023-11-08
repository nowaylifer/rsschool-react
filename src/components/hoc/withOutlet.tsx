import { Outlet } from 'react-router-dom';
import { ComponentType, FC } from 'react';

function withOutlet<P extends Record<string, unknown>>(WrappedComponent: ComponentType<P>) {
  const ComponentWithOutlet: FC<P> = (props) => {
    return (
      <>
        <WrappedComponent {...props} />
        <Outlet />
      </>
    );
  };

  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  ComponentWithOutlet.displayName = `withOutlet(${displayName})`;

  return ComponentWithOutlet;
}

export default withOutlet;
