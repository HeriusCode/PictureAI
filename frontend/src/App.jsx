import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Workers from './pages/Workers';
import Statistics from './pages/Statistics';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-surface-50 text-surface-800">
      {/* Header bar */}
      <Header />

      {/* Main Content Pages */}
      <main className="flex-1 flex flex-col">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/workers" element={<Workers />} />
          <Route path="/statistics" element={<Statistics />} />
          {/* Fallback to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
