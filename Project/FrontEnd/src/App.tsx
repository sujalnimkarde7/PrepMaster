import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CodingPractice from './pages/CodingPractice';
import MockInterviews from './pages/MockInterviews';
import ResumeReview from './pages/ResumeReview';
import CompanyPrep from './pages/CompanyPrep';
import Dashboard from './pages/Dashboard';
import { ThemeProvider } from './context/ThemeContext';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/practice" element={<CodingPractice />} />
              <Route path="/mock-interviews" element={<MockInterviews />} />
              <Route path="/resume-review" element={<ResumeReview />} />
              <Route path="/company-prep" element={<CompanyPrep />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </div>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;