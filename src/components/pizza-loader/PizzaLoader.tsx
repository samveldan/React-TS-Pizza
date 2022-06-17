import * as React from 'react';
import ContentLoader from 'react-content-loader';

const PizzaLoader: React.FC = () => {
  return (
    <ContentLoader
      speed={2}
      width={804}
      height={400}
      viewBox="0 0 804 400"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb">
      <rect x="133" y="125" rx="0" ry="0" width="1" height="0" />
      <rect x="-1" y="0" rx="7" ry="7" width="400" height="400" />
      <rect x="0" y="417" rx="7" ry="7" width="280" height="30" />
      <rect x="428" y="70" rx="7" ry="7" width="404" height="230" />
    </ContentLoader>
  );
};

export default PizzaLoader;
