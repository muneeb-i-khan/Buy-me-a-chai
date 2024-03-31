import { useState, useEffect } from 'react';
import axios from 'axios';
import { useWallet } from '@solana/wallet-adapter-react';

const ProfilePage = () => {
  const { publicKey } = useWallet();
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    walletAddress: publicKey?.toBase58() || ''
  });
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [failureModalVisible, setFailureModalVisible] = useState(false);
  const [existingUserModalVisible, setExistingUserModalVisible] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const existingUser = await checkExistingUser(formData.walletAddress);
      if (existingUser) {
        setExistingUserModalVisible(true);
        return;
      }

      const response = await axios.post('http://localhost:5000/profile', formData);
      console.log(response.data);
      setSuccessModalVisible(true);
    } catch (error) {
      console.error(error);
      setFailureModalVisible(true);
    }
  };

  const closeSuccessModal = () => {
    setSuccessModalVisible(false);
  };

  const closeFailureModal = () => {
    setFailureModalVisible(false);
  };

  const closeExistingUserModal = () => {
    setExistingUserModalVisible(false);
  };

  const checkExistingUser = async (walletAddress) => {
    try {
      const response = await axios.get('http://localhost:5000/profile');

      const existingWalletAddresses = response.data.data.map(user => user.walletAddress);
      console.log(existingWalletAddresses);
      const userExists = existingWalletAddresses.includes(walletAddress);
      return userExists;
    } catch (error) {
      console.error(error);
      return true;
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="form-input mt-1 block w-full" required />
        </div>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700">Username:</label>
          <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} className="form-input mt-1 block w-full" required />
        </div>
        <div className="mb-4">
          <label htmlFor="walletAddress" className="block text-gray-700">Wallet Address:</label>
          <input type="text" id="walletAddress" name="walletAddress" value={formData.walletAddress} readOnly className="form-input mt-1 block w-full" required />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Submit</button>
      </form>

      {successModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-green-600 font-bold">Success! Profile created.</p>
            <button onClick={closeSuccessModal} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Close</button>
          </div>
        </div>
      )}

      {failureModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-red-600 font-bold">Profile already exists.</p>
            <button onClick={closeFailureModal} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Close</button>
          </div>
        </div>
      )}

      {existingUserModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-red-600 font-bold">User already registered.</p>
            <button onClick={closeExistingUserModal} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
