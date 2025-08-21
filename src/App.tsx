import React from 'react';
import ProgressCard from './components/ProgressCard';

const App: React.FC = () => {
  return (
    <main className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen flex items-center justify-center p-4">
      <ProgressCard />
    </main>
  );
};

export default App;