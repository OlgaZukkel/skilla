import React, {memo, Suspense} from 'react';
import {useRouterApp} from '@/hooks/useRouter.js';
import {MonoHooksStore} from 'use-mono-hook';
import '../index.css';



const RouterApp = memo(() => {
  const {route, router: {location} = {}, Component} = useRouterApp();
  if (!route || !location) {
    return null;
  }
  return (
    <Suspense fallback={''}>
      {Component && <Component/>}
    </Suspense>
  );
});

const App = memo(() => {

  return (
    <>
      <RouterApp/>
      <MonoHooksStore/>
    </>
  );
});

export default App;
