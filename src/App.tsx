import React from 'react';
import './App.css';
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json';

function App() {
  return (
    <div className="App">
      <h1>Solidity HardHat Ethers DApp Template with Typescript</h1>
      {console.log("Greeter ABI: ", Greeter.abi)}
    </div>
  );
}

export default App;
