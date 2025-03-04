import React, {memo, Suspense} from 'react';
import {MonoHooksStore} from 'use-mono-hook';
import '../index.css';
import MainPage from "pages/main/index.js";


const App = memo(() => {

  return (
    <>
      <MainPage/>
      <MonoHooksStore/>
    </>
  );
});

export default App;
