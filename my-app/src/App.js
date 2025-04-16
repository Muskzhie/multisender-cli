import React, { useState } from 'react';
import './App.css';

function App() {
  const [walletAddress, setWalletAddress] = useState('');
  const [tokenAmount, setTokenAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Sending ${tokenAmount} tokens to ${walletAddress}`);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Airdrop App</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Wallet Address:
            <input
              type="text"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              placeholder="Enter Wallet Address"
              required
            />
          </label>
          <br />
          <label>
            Token Amount:
            <input
              type="number"
              value={tokenAmount}
              onChange={(e) => setTokenAmount(e.target.value)}
              placeholder="Enter Token Amount"
              required
            />
          </label>
          <br />
          <button type="submit">Submit Airdrop</button>
        </form>
      </header>
    </div>
  );
}

export default App;
