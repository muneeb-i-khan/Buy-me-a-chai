import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Profile {
  id: number;
  name: string;
  username: string;
  walletAddress: string;
}

const ProfileListPage: React.FC = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]); // Initialize as empty array
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get<{ data: Profile[] }>('http://localhost:5000/profile');
        console.log(response.data.data); // Check the response data
        setProfiles(response.data.data || []); // Ensure response.data.data is not undefined
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchProfiles();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredProfiles = profiles.filter((profile) =>
    profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.walletAddress.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md shadow-green-700">
      <h1 className="text-2xl font-bold mb-4 text-green-700">Fund your favorite creator</h1>
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
          </tr>
        </thead>
        <tbody>
          {filteredProfiles.map((profile) => (
            <tr key={profile.id}>
              <td className="border px-4 py-2">{profile.name}</td>
              <td className="border px-4 py-2">{profile.username}</td>
              <td className="border px-4 py-2">{profile.walletAddress}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProfileListPage;
