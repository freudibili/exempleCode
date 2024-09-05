import {useCallback, useEffect, useState} from 'react';
import {requestTrackingPermission} from 'react-native-tracking-transparency';
import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';

const useAnalyticsPermission = () => {
  const [analyticsPermission, setAnalyticsPermission] = useState(false);

  const enableAnalytics = async () => {
    try {
      await analytics().setAnalyticsCollectionEnabled(true);
    } catch (error) {
      console.error('Error enabling analytics:', error);
    }
  };

  const disableAnalytics = async () => {
    try {
      await analytics().setAnalyticsCollectionEnabled(false);
    } catch (error) {
      console.error('Error disabling analytics:', error);
    }
  };

  const enableCrashlytics = () => {
    crashlytics().setCrashlyticsCollectionEnabled(true);
  };

  const disableCrashlytics = () => {
    crashlytics().setCrashlyticsCollectionEnabled(false);
  };

  const handlePermissionRequest = useCallback(async () => {
    try {
      const trackingStatus = await requestTrackingPermission();
      if (trackingStatus === 'authorized') {
        setAnalyticsPermission(true);
        enableAnalytics();
        enableCrashlytics();
      } else {
        setAnalyticsPermission(false);
        disableAnalytics();
        disableCrashlytics();
      }
    } catch (error) {
      console.error('Error requesting permission:', error);
    }
  }, []);

  useEffect(() => {
    handlePermissionRequest();
  }, [handlePermissionRequest]);

  return analyticsPermission;
};

export default useAnalyticsPermission;
