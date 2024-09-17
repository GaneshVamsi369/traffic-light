import React, { useContext } from 'react';
import { TrafficContext } from '../TrafficContext';

const EmergencyButton = () => {
  const { dispatch } = useContext(TrafficContext);

  const handleEmergencyOverride = () => {
    dispatch({ type: 'EMERGENCY_OVERRIDE' });
  };

  return <button className='emergency-button' onClick={handleEmergencyOverride}>Emergency Override</button>;
};

export default EmergencyButton;
