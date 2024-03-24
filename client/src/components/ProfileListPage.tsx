import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Connection, PublicKey, Transaction, SystemProgram } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';
import Modal from 'react-modal';
import Spinner from './Spinner';

interface Profile {
  id: number;
  name: string;
  username: string;
  walletAddress: string;
}

const ProfileListPage: React.FC = () => {
  const { publicKey, signTransaction } = useWallet();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [amount, setAmount] = useState(0);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get<{ data: Profile[] }>('http://localhost:5000/profile');
        setProfiles(response.data.data || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfiles();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFund = (profile: Profile) => {
    setSelectedProfile(profile);
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
    setSelectedProfile(null);
    setAmount(0);
    setLoading(false);
  };

  const handleSendFunds = async () => {
    if (!publicKey || !selectedProfile) return;

    setLoading(true);

    const connection = new Connection('https://api.devnet.solana.com');
    const recipientPublicKey = new PublicKey(selectedProfile.walletAddress);
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: recipientPublicKey,
        lamports: amount * 1000000000,
      })
    );

    try {
      let blockhash = (await connection.getLatestBlockhash('finalized')).blockhash;
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = publicKey;
      const signedTransaction = signTransaction && (await signTransaction(transaction));
      const txid = signedTransaction && (await connection.sendRawTransaction(signedTransaction.serialize()));

      const explorerUrl = `https://explorer.solana.com/tx/${txid}`;

      window.open(explorerUrl, '_blank');

      handleCloseModal();
    } catch (error) {
      console.error('Failed to send funds:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Fund your favorite creator</h1>
      <input
        type="text"
        placeholder="Search by name, username, or wallet address"
        value={searchTerm}
        onChange={handleSearch}
        className="form-input mt-1 mb-4 block w-full"
      />
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Username</th>
            <th className="px-4 py-2">Wallet Address</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {profiles.map((profile) => (
            <tr key={profile.id}>
              <td className="border px-4 py-2">{profile.name}</td>
              <td className="border px-4 py-2">{profile.username}</td>
              <td className="border px-4 py-2">{profile.walletAddress}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleFund(profile)}
                >
                  Fund
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        className="modal fixed flex items-center justify-center inset-0 rounded-lg shadow-xl p-8 bg-white"
        overlayClassName="modal-overlay fixed inset-0 bg-gray-500 bg-opacity-75"
      >
        {loading ? (
          <Spinner />
        ) : (
          <div className="modal-content bg-white rounded-lg shadow-xl p-8">
            <h2 className="text-xl font-bold mb-4">Enter Amount to Send to {selectedProfile?.name}</h2>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value))}
              className="border p-2 mb-4 w-full"
            />
            <div className="flex justify-between">
              <button
                onClick={handleSendFunds}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Send
              </button>
              <button
                onClick={handleCloseModal}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ProfileListPage;
