import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import AuctionsPage from './pages/AuctionsPage';
import TransactionHistoryPage from './pages/TransactionHistoryPage';
import UserSettingsPage from './pages/UserSettingsPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/auctions" element={<AuctionsPage />} />
          <Route path="/transactions" element={<TransactionHistoryPage />} />
          <Route path="/settings" element={<UserSettingsPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;