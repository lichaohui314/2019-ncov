import React from 'react';
import "./App.css"

const Map = React.lazy(() => import('./Map'))


function Header ({ province }) {
  return (
    <header>
      <div className="bg"></div>
      <h1>
        <small>新型冠状病毒</small>
        <br />
        疫情实时动态 · { province ? province.name : '省市地图' }
      </h1>
      <i>By 全栈成长之路</i>
    </header>
  )
}

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Map></Map>
    </div>
  );
}

export default App;
