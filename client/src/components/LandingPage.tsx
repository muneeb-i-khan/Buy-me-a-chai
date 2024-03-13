import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleFundingClick = () => {
    navigate('/funding');
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center ">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-black- mb-4">Buy me a  
        <span className=' bg-gradient-to-l
     from-purple-600
     via-purple-700
     to-purple-800
     text-transparent
     bg-clip-text   
     hover:scale-110 transition-all duration-500 ease-in-out'> chai</span>  🍵</h1>
        <p className="text-lg text-gray-600 mb-8">A Buy Me a Coffee alternative built on Solana</p>
      </div>
      <div className="absolute top-0 right-0 mt-4 mr-4 flex">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2" onClick={handleProfileClick}>Profile</button>
        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded" onClick={handleFundingClick}>Fund</button>
      </div>
    </div>
  );
};

export default LandingPage;
