import React, { useState } from 'react';
import { ethers } from 'ethers';
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json';

import './App.css';

const smartContractAddress = 'smart_contract_address'

function App() {

  const [greeting, setGreetingValue] = useState('');

  // request access to the user's Metamask account
  const requestAccount = async () => {
    await window.ethereum.request({
      method: 'eth_requestAccounts'
    });
  };

  // call the smart contract
  // @fetch current value
  const fetchGreeting = async () => {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(smartContractAddress, Greeter.abi, provider);

      try {
        const data = await contract.greet();
        console.log('data: ', data);
      } catch (err) {
        console.log('error: ', err);
      };
    };
  };

  // call the smart contract
  // @post update current value
  const setGreeting = async () => {
    if (!greeting) return 
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(smartContractAddress, Greeter.abi, signer);
      const transaction = await contract.setGreeting(greeting);
      await transaction.wait();
      fetchGreeting();
    };
  };

  return (
    <div className="App">
      <h1>Solidity HardHat Ethers DApp Template with Typescript</h1>
      <br />
      <button onClick={fetchGreeting}>Fetch Greeting</button>
      <button onClick={setGreeting}>Set Greeting</button>
      <input onChange={e => setGreetingValue(e.target.value)} placeholder="Set greeting" />
    </div>
  );
}

export default App;
