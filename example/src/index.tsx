import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';

const App = () => {
  return (
    <div className='text-green-500 red'>
      这是绿色的文本
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
