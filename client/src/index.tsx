import React from 'react';
import { render } from 'react-dom';
import { useTest } from './use-test';

const App = () => {
  const { count, setCount } = useTest();
  return (
    <div>
      <h1>Hi</h1>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
};

render(<App />, document.getElementById('root'));
