import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import UserProfile from "./UserProfile";
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
// Import your contract's ABI (adjust the path as needed)
import IdentityRegistry from '/home/zourv/A HOME/harkiart works/sem5/react 252/working/src/contrct/IdentityRegistry.json';

// Replace with your deployed contract address
const contractAddress = '0xd9145CCE52D386f254917e481eB44e9943F39138';


const Home = () => <div>Home</div>;
const About = () => <div>About</div>;
const Contact = () => <div>Contact</div>;

export  function App() {
  const [account, setAccount] = useState(null);
  const [name, setName] = useState('');
  const [idHash, setIdHash] = useState('');
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(false);
  const [identity, setIdentity] = useState(null);

  // Initialize the provider on mount.
  useEffect(() => {
    if (window.ethereum) {
      const newProvider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(newProvider);
    } else {
      console.error('MetaMask is not installed.');
    }
  }, []);

  // Function to connect the user's MetaMask wallet.
  const connectWallet = async () => {
    try {
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const addr = await signer.getAddress();
      setAccount(addr);
      // Create a contract instance using the signer.
      const identityContract = new ethers.Contract(contractAddress, IdentityRegistry.abi, signer);
      setContract(identityContract);
    } catch (error) {
      console.error('Wallet connection error:', error);
    }
  };

  // Function to register the identity.
  const registerIdentity = async () => {
    if (!contract) return;
    try {
      setLoading(true);
      // Call the smart contract function.
      const tx = await contract.registerIdentity(name, idHash);
      // Wait for the transaction to be mined.
      await tx.wait();
      setLoading(false);
      alert("Identity registered successfully!");
    } catch (error) {
      console.error('Registration error:', error);
      setLoading(false);
    }
  };

  // Function to fetch and display the registered identity.
  const fetchIdentity = async () => {
    if (!contract || !account) return;
    try {
      const result = await contract.getIdentity(account);
      setIdentity({ name: result[0], idHash: result[1] });
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Identity Registration dApp</h1>
      {!account ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <div>
          <p>Connected as: {account}</p>

          <div style={{ marginTop: "2rem" }}>
            <h2>Register Identity</h2>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ marginRight: "1rem" }}
            />
            <input
              type="text"
              placeholder="ID Hash"
              value={idHash}
              onChange={(e) => setIdHash(e.target.value)}
              style={{ marginRight: "1rem" }}
            />
            <button onClick={registerIdentity} disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>
          </div>

          <div style={{ marginTop: "2rem" }}>
            <h2>Fetch Identity</h2>
            <button onClick={fetchIdentity}>Fetch Identity</button>
            {identity && (
              <div style={{ marginTop: "1rem" }}>
                <p><strong>Name:</strong> {identity.name}</p>
                <p><strong>ID Hash:</strong> {identity.idHash}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
export default App;
