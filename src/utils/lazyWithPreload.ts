import React, {LazyExoticComponent} from 'react';

export const lazyWithPreload = (factory: () => Promise<{
  default: React.ComponentType<any>;
}>): LazyExoticComponent<React.ComponentType<any>> => {
  const Component = React.lazy(factory);
  Component['preload'] = factory;
  return Component;
};