import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  if (!auth.isAuthenticated) {
    navigate('/login');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-green-900 text-white px-6 py-4">
          <h1 className="text-2xl font-bold">User Profile</h1>
        </div>
        
        <div className="p-6">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-3xl text-gray-500">
                  {auth.user.display_name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h2 className="text-xl font-semibold">{auth.user.display_name}</h2>
                <p className="text-gray-600">{auth.user.email}</p>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Account Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-600 text-sm mb-1">Name</label>
                  <p className="font-medium">{auth.user.display_name}</p>
                </div>
                <div>
                  <label className="block text-gray-600 text-sm mb-1">Email</label>
                  <p className="font-medium">{auth.user.email}</p>
                </div>
                <div>
                  <label className="block text-gray-600 text-sm mb-1">Member Since</label>
                  <p className="font-medium">{new Date(auth.user.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Actions</h3>
              <div className="space-x-4">
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  Edit Profile
                </button>
                <button 
                  onClick={() => {
                    logout();
                    navigate('/login');
                  }}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 