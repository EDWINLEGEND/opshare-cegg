import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Browse from './pages/Browse';
import Community from './pages/Community';
import SellerDashboard from './pages/SellerDashboard';
import SellForm from './pages/SellForm';
import HowItWorks from './pages/HowItWorks';
import NotFound from './pages/NotFound'; // 404 page component
import Footer from './components/Footer';
import Index from './pages/Index';
import MissionsAndRewards from './pages/MissionsAndRewards';
import Settings from './pages/Settings';
import AdminDashboard from './pages/admin/AdminDashboard';

// Wrapper component that decides when to show the footer
const AppContent = () => {
  const location = useLocation();
  
  // Only show footer on these pages
  const showFooterPaths = ['/', '/how-it-works', '/browse'];
  const shouldShowFooter = showFooterPaths.includes(location.pathname);
  
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={
          <ProtectedRoute adminForbidden={true}>
            <SellerDashboard />
          </ProtectedRoute>
        } />
        <Route path="/sell" element={<SellForm />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/community" element={<Community />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/missions" element={
          <ProtectedRoute adminForbidden={true}>
            <MissionsAndRewards />
          </ProtectedRoute>
        } />
        <Route path="/settings" element={<Settings />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {shouldShowFooter && <Footer />}
    </>
  );
};

function App() {
  return (
    <UserProvider>
      <Router>
        <AppContent />
      </Router>
    </UserProvider>
  );
}

export default App;
