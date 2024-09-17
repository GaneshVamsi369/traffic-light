import React from 'react';
import { TrafficProvider } from './components/TrafficContext';
import TrafficLight from './components/TrafficLight';
import PedestrianButton from './components/PedestrianButton';
import EmergencyButton from './components/EmergencyButton';
import './App.css';

const App = () => {
  return (
    <TrafficProvider>
      <div className="app">
        <h1>Traffic Light Simulator</h1>
        <TrafficLight />
        <PedestrianButton />
        <EmergencyButton />
      </div>
    </TrafficProvider>
  );
};

export default App;
