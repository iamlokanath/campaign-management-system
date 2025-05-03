import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import CampaignList from './components/CampaignList';
import CampaignForm from './components/CampaignForm';
import MessageGenerator from './components/MessageGenerator';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import NewCampaign from './components/NewCampaign';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <Navbar />

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/campaign-list" element={<CampaignList />} />
            <Route path="/create-campaign" element={<CampaignForm />} />
            <Route path="/edit-campaign/:id" element={<CampaignForm />} />
            <Route path="/message-generator" element={<MessageGenerator />} />
          </Routes>
        </main>

      </div>
    </Router>
  );
};

export default App;
