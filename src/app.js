import React from 'react';
import ReactDOM from 'react-dom';

import Home from './components/layout/Home';

class App extends React.Component{
  constructor(){
    super();
    console.log("App:constructor()");
  }

  render(){
    return(
      <div>
        <Home/>
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));
