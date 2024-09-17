import React, { useContext } from 'react';
import { TrafficContext } from '../TrafficContext';

const TrafficLight = () => {
  const { state } = useContext(TrafficContext);

  return (
    <div className="traffic-light">
      <div className={`light red ${state.currentLight === 'red' ? 'on' : ''}`}>
        {state.currentLight === 'red' && <span>{state.timer}</span>}
      </div>
      <div className={`light yellow ${state.currentLight === 'yellow' ? 'on' : ''}`}>
        {state.currentLight === 'yellow' && <span>{state.timer}</span>}
      </div>
      <div className={`light green ${state.currentLight === 'green' ? 'on' : ''}`}>
        {state.currentLight === 'green' && <span>{state.timer}</span>}
      </div>
    </div>
  );
};

export default TrafficLight;
