import { ComponentClass } from 'react';
import { serializeError } from 'serialize-error';
import lscache from 'lscache';

function withPersistance<P extends object, S>(
  WrappedComponent: ComponentClass<P, S>,
  stateFields?: S extends object ? Array<keyof S> : never
) {
  const componentName = WrappedComponent.displayName ?? WrappedComponent.name;

  class PersistentComponent extends WrappedComponent {
    constructor(props: P) {
      super(props);

      const savedState = lscache.get(componentName);

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
            const value = this.state[field];
            Object.assign(acc, { [field]: value instanceof Error ? serializeError(value) : value });
            return acc;
          }, {} as Partial<S>);

          lscache.set(componentName, stateToPersist, 60);
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
