import { useState, useEffect } from "react";

let globalState = {};

// listeners should be filled with functions that can update state
let listeners = [];
let actions = {};

// similar to what useReducer does
export const useStore = (shouldListen = true) => {
  // Only get the update function
  const setState = useState(globalState)[1];

  // to dispatch actions from a component to the reducer
  const dispatch = (actionIdentifer) => {
    // Actions should store functions which manipulate the globalState to return a new state
    const newState = actions[actionIdentifier](globalState);
    globalState = { ...globalState, ...newState };

    for (const listener of listeners) {
      // This updates the global state
      listener(globalState);
    }
  };

  // Only run when the component mounts
  useEffect(() => {
    if (shouldListen) {
    listeners.push(setState);
    }

    // return a cleanup function
    return () => {
      if (shouldListen) {
      // Remove all listeners that are not setState when the component unmounts
      listeners = listeners.filter((li) => li !== setState);
      }
    };
  }, [setState, shouldListen]);

  return [globalState, dispatch];
};

export const initStore = (userActions, initialState) => {
  if (initialState) {
    // Combine current global state with passed in initialState (if it is)
    globalState = { ...globalState, initialState };
  }
  actions = { ...actions, ...userActions };
};
