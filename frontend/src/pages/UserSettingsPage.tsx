import React, { useState } from 'react';
import { Settings, User, Wallet, Copy, Check, Camera } from 'lucide-react';
import WalletConnectButton from '../components/WalletConnectButton';

interface UserProfile {
  name: string;
  email: string;
  avatarUrl: string;
}

const UserSettingsPage = () => {
  const [profile, setProfile] = useState<UserProfile>({
    name: 'CryptoArtist',
    email: 'artist@example.com',
    avatarUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [formData, setFormData] = useState(profile);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(formData);
    setIsEditing(false);
    // Here you would typically make an API call to update the profile
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="relative mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-blue-500/10 rounded-lg blur-xl"></div>
          <div className="relative bg-black/50 border border-red-500/20 rounded-lg p-8">
            <div className="flex items-center space-x-4">
              <Settings className="w-8 h-8 text-red-500" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">
                Profile Settings
              </h1>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Picture Section */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg"></div>
            <div className="relative bg-black/50 border border-red-500/20 rounded-lg p-6">
              <div className="relative w-48 h-48 mx-auto mb-4">
                <img
                  src={profile.avatarUrl}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-lg"
                />
                <button className="absolute bottom-2 right-2 p-2 bg-black/80 rounded-full border border-red-500/50 text-red-500 hover:bg-red-500/20 transition-all duration-200">
                  <Camera className="w-5 h-5" />
                </button>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-white mb-1">{profile.name}</h3>
                <p className="text-gray-400">{profile.email}</p>
              </div>
            </div>
          </div>

          {/* Profile Form */}
          <div className="md:col-span-2">
            <div className="relative group h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg"></div>
              <div className="relative bg-black/50 border border-red-500/20 rounded-lg p-6 h-full">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-gray-400 mb-2">Display Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        disabled={!isEditing}
                        className="w-full bg-black/50 border border-red-500/20 rounded-lg px-4 py-2 pl-10 text-white placeholder-gray-400 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 disabled:opacity-50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-400 mb-2">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      disabled={!isEditing}
                      className="w-full bg-black/50 border border-red-500/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 disabled:opacity-50"
                    />
                  </div>

                  {/* Wallet Section */}
                  <div className="pt-6 border-t border-red-500/20">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <Wallet className="w-5 h-5 text-red-500" />
                        <h3 className="text-lg font-semibold text-white">Connected Wallet</h3>
                      </div>
                      <WalletConnectButton />
                    </div>
                    
                    <div className="flex items-center space-x-2 bg-black/50 border border-red-500/20 rounded-lg p-3">
                      <code className="text-gray-400 flex-1">0x1234...5678</code>
                      <button
                        onClick={() => copyToClipboard('0x1234...5678')}
                        className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                      >
                        {isCopied ? (
                          <Check className="w-5 h-5 text-green-500" />
                        ) : (
                          <Copy className="w-5 h-5 text-red-500" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4 pt-6">
                    {isEditing ? (
                      <>
                        <button
                          type="button"
                          onClick={() => {
                            setFormData(profile);
                            setIsEditing(false);
                          }}
                          className="px-6 py-2 bg-black/50 border border-red-500/20 rounded-lg text-gray-400 hover:border-red-500/50 transition-all duration-200"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2 bg-gradient-to-r from-red-600 to-red-500 rounded-lg font-semibold hover:from-red-500 hover:to-red-400 transform hover:scale-105 transition-all duration-200 shadow-[0_0_15px_rgba(239,68,68,0.5)] hover:shadow-[0_0_25px_rgba(239,68,68,0.7)]"
                        >
                          Save Changes
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setIsEditing(true)}
                        className="px-6 py-2 bg-gradient-to-r from-red-600 to-red-500 rounded-lg font-semibold hover:from-red-500 hover:to-red-400 transform hover:scale-105 transition-all duration-200 shadow-[0_0_15px_rgba(239,68,68,0.5)] hover:shadow-[0_0_25px_rgba(239,68,68,0.7)]"
                      >
                        Edit Profile
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSettingsPage;