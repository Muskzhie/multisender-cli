import React, { useState } from 'react';
import { ethers } from 'ethers';
import './App.css';

const TOKEN_ADDRESS = "0x7d3D9984104e5db591C85cc8923646e698430981";

const ERC20_ABI = [
  "function transfer(address to, uint amount) returns (bool)"
];

function App() {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [inputData, setInputData] = useState('');
  const [isSending, setIsSending] = useState(false);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Metamask belum terpasang!");
      return;
    }
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error("Gagal connect wallet:", error);
    }
  };

  const sendTokens = async (e) => {
    e.preventDefault();

    if (!window.ethereum) return alert("Metamask tidak ditemukan");

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(TOKEN_ADDRESS, ERC20_ABI, signer);
    const decimals = 18;

    const lines = inputData.split('\n').filter(Boolean);

    setIsSending(true);
    try {
      for (const line of lines) {
        const [address, amountStr] = line.split(',').map(item => item.trim());
        const amount = ethers.parseUnits(amountStr, decimals);
        const tx = await contract.transfer(address, amount);
        await tx.wait();
        console.log(`Sent ${amountStr} tokens to ${address}`);
      }
      alert("✅ Semua token berhasil dikirim!");
    } catch (err) {
      console.error(err);
      alert("❌ Gagal mengirim token ke beberapa/alamat");
    }
    setIsSending(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Multisender Token</h2>

        {!currentAccount ? (
          <button onClick={connectWallet}>Connect Wallet</button>
        ) : (
          <p>🟢 Connected: {currentAccount.slice(0, 6)}...{currentAccount.slice(-4)}</p>
        )}

        <form onSubmit={sendTokens} style={{ marginTop: '20px' }}>
          <textarea
            rows="10"
            cols="50"
            placeholder="0xABC...,10\n0xDEF...,20"
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
            required
            style={{ padding: '10px', marginBottom: '10px' }}
          />
          <br />
          <button type="submit" disabled={isSending}>
            {isSending ? 'Sending...' : 'Send Tokens'}
          </button>
        </form>
      </header>
    </div>
  );
}

export default App;
