import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

const App = () => {
  return (
    <div className='text-green-500'>
      这是带颜色的文本
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
