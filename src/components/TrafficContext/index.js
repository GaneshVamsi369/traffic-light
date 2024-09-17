import React, { createContext, useReducer, useEffect } from 'react';

// Initial State
const initialState = {
  currentLight: 'green',
  pedestrianRequested: false,
  timer: 10, // Initially 10 seconds for green light
  emergencyOverride: false,
};

// Action Types
const CHANGE_LIGHT = 'CHANGE_LIGHT';
const REQUEST_CROSSING = 'REQUEST_CROSSING';
const RESET_TIMER = 'RESET_TIMER';
const EMERGENCY_OVERRIDE = 'EMERGENCY_OVERRIDE';
const EXTEND_RED = 'EXTEND_RED';

// Reducer function
const trafficReducer = (state, action) => {
  switch (action.type) {
    case CHANGE_LIGHT:
      return {
        ...state,
        currentLight: action.payload.light,
        timer: action.payload.timer,
      };
    case REQUEST_CROSSING:
      return {
        ...state,
        pedestrianRequested: true,
      };
    case RESET_TIMER:
      return {
        ...state,
        timer: action.payload,
      };
    case EMERGENCY_OVERRIDE:
      return {
        ...state,
        emergencyOverride: true,
        currentLight: 'red',
        timer: 5,
      };
    case EXTEND_RED:
      return {
        ...state,
        timer: 5,
        pedestrianRequested: false, // Reset the pedestrian request after extending the red light
      };
    default:
      return state;
  }
};

// Create Context
export const TrafficContext = createContext();

// TrafficProvider component
export const TrafficProvider = ({ children }) => {
  const [state, dispatch] = useReducer(trafficReducer, initialState);

  // Light sequence handling
  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (state.emergencyOverride) return; // Stop if emergency is triggered

      // When timer reaches 0, change the light according to the sequence
      if (state.timer === 0) {
        switch (state.currentLight) {
          case 'green':
            dispatch({ type: CHANGE_LIGHT, payload: { light: 'yellow', timer: 3 } });
            break;
          case 'yellow':
            dispatch({ type: CHANGE_LIGHT, payload: { light: 'red', timer: 7 } });
            break;
          case 'red':
            // If a pedestrian crossing is requested, extend the red light for 5 seconds
            if (state.pedestrianRequested) {
              dispatch({ type: EXTEND_RED });
            } else {
              dispatch({ type: CHANGE_LIGHT, payload: { light: 'green', timer: 10 } });
            }
            break;
          default:
            break;
        }
      } else {
        // Reduce the timer countdown
        dispatch({ type: RESET_TIMER, payload: state.timer - 1 });
      }
    }, 1000);

    return () => clearInterval(timerInterval); // Clear interval on unmount
  }, [state.timer, state.currentLight, state.emergencyOverride, state.pedestrianRequested]);

  return (
    <TrafficContext.Provider value={{ state, dispatch }}>
      {children}
    </TrafficContext.Provider>
  );
};
