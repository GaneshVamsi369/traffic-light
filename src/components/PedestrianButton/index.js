import React, { useContext } from 'react';
import { TrafficContext } from '../TrafficContext';

const PedestrianButton = () => {
  const { state, dispatch } = useContext(TrafficContext);

  const handlePedestrianRequest = () => {
    // Dispatch the pedestrian crossing request only if the light is green or yellow
    if (state.currentLight === 'green' || state.currentLight === 'yellow') {
      dispatch({ type: 'REQUEST_CROSSING' });
    }
  };

  return (
    <button
      className={`pedestrian-button ${state.pedestrianRequested ? 'requested' : ''}`}
      onClick={handlePedestrianRequest}
      disabled={state.pedestrianRequested} // Disable the button if already requested
    >
      {state.pedestrianRequested ? 'Wait to Cross' : 'Request to Cross'}
    </button>
  );
};

export default PedestrianButton;
