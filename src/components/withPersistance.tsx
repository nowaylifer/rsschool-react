import { ComponentClass } from 'react';

function withPersistance<P extends object, S>(
  WrappedComponent: ComponentClass<P, S>,
  stateFields?: S extends object ? Array<keyof S> : never
) {
  const componentName = WrappedComponent.displayName ?? WrappedComponent.name;

  class PersistentComponent extends WrappedComponent {
    constructor(props: P) {
      super(props);

      const savedState = JSON.parse(localStorage.getItem(componentName) ?? 'null');

      if (savedState) {
        if (stateFields) {
          Object.assign(this.state, savedState);
        } else {
          this.state = savedState;
        }
      }

      const handler: ProxyHandler<(...args: unknown[]) => unknown> = {
        apply: (...args) => {
          const stateToPersist = stateFields?.reduce<Partial<S>>((acc, field) => {
            Object.assign(acc, { [field]: this.state[field] });
            return acc;
          }, {} as Partial<S>);

          localStorage.setItem(
            componentName,
            JSON.stringify(stateFields ? stateToPersist : this.state)
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
