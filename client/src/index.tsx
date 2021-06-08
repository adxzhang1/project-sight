import React from 'react';
import { render } from 'react-dom';
import { CategorySection } from './components/category-section';
import { useFoo } from './use-foo';

const App = () => {
  const { categories, loading } = useFoo();

  return (
    <div>
      {loading ? (
        <p>loading...</p>
      ) : (
        categories.map((category) => <CategorySection category={category} />)
      )}
    </div>
  );
};

render(<App />, document.getElementById('root'));
