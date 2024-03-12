import React, { useState } from 'react';
import axios from 'axios';
import {Avatar, AvatarGroup, AvatarIcon} from "@nextui-org/react";

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    walletAddress: ''
  });
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [failureModalVisible, setFailureModalVisible] = useState(false);

  const handleChange = (e:any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
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

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md shadow-blue-500">
      <h1 className="text-2xl font-bold  mb-4 text-blue-500">Profile</h1>
      <div className='mb-4'>
      <Avatar isBordered color="primary" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="form-input mt-1 block w-full" required  placeholder='Enter name'/>
        </div>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700">Username:</label>
          <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} className="form-input mt-1 block w-full" required placeholder='Enter username'/>
        </div>
        <div className="mb-4">
          <label htmlFor="walletAddress" className="block text-gray-700">Wallet Address:</label>
          <input type="text" id="walletAddress" name="walletAddress" value={formData.walletAddress} onChange={handleChange} className="form-input mt-1 block w-full" required placeholder='Enter wallet address'/>
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
            <p className="text-red-600 font-bold">Failed to create profile. Please try again later.</p>
            <button onClick={closeFailureModal} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
