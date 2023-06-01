import React from 'react';
import 'antd/dist/reset.css';
// import './App.css';
const Home = React.lazy(() => import("./layout/index.tsx"));

const App = () => (
  <div className="App">
    <Home></Home>
  </div>
);

export default App;