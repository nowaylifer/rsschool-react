import { ComponentClass } from 'react';

function withPersistance<P extends object>(
  WrappedComponent: ComponentClass<P>,
  stateField?: string
) {
  const componentName = WrappedComponent.displayName ?? WrappedComponent.name;

  class PersistentComponent extends WrappedComponent {
    constructor(props: P) {
      super(props);

      const savedState = JSON.parse(localStorage.getItem(componentName) ?? 'null');

      if (savedState) {
        if (stateField) {
          Object.assign(this.state, { [stateField]: savedState });
        } else {
          this.state = savedState;
        }
      }

      const handler: ProxyHandler<(...args: unknown[]) => unknown> = {
        apply: (...args) => {
          localStorage.setItem(
            componentName,
            JSON.stringify(stateField ? this.state[stateField] : this.state)
          );
          return Reflect.apply(...args);
        },
      };

      this.componentDidMount = new Proxy(this.componentDidMount ?? function () {}, handler);
      this.componentDidUpdate = new Proxy(this.componentDidUpdate ?? function () {}, handler);
    }
  }

  PersistentComponent.displayName = `withPersistance(${componentName})`;

  return PersistentComponent;
}

export default withPersistance;
