import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import CampaignList from './components/CampaignList';
import CampaignForm from './components/CampaignForm';
import MessageGenerator from './components/MessageGenerator';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <Navbar />

        <main>
          <Routes>
            <Route path="/" element={<CampaignList />} />
            <Route path="/create-campaign" element={<CampaignForm />} />
            <Route path="/edit-campaign/:id" element={<CampaignForm />} />
            <Route path="/message-generator" element={<MessageGenerator />} />
          </Routes>
        </main>

        <footer>
          <p>© {new Date().getFullYear()} Campaign Management System. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
