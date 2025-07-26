import React from 'react';

const TestApp: React.FC = () => {
  console.log('🧪 TestApp component rendering...');
  
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#2563eb' }}>🎉 BronxWorks Test Success!</h1>
      <p>If you see this, React is working correctly!</p>
      <p>Base URL: {import.meta.env.BASE_URL}</p>
      <p>Mode: {import.meta.env.MODE}</p>
      <button 
        onClick={() => alert('Button clicked!')}
        style={{ 
          padding: '10px 20px', 
          backgroundColor: '#2563eb', 
          color: 'white', 
          border: 'none', 
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Test Button
      </button>
    </div>
  );
};

export default TestApp;