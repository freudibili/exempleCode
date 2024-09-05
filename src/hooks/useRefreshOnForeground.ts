import {useState, useEffect, useRef} from 'react';
import {AppState, AppStateStatus} from 'react-native';
import {handleAppActive, handleAppBackground} from '../utils/initHelper';

function useRefreshOnForeground(): AppStateStatus {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        handleAppBackground();
      }

      if (
        appState.current.match(/background|unknown/) &&
        nextAppState === 'active'
      ) {
        handleAppActive();
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, [appState]);

  return appStateVisible;
}

export default useRefreshOnForeground;
