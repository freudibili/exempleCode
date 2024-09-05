import DeviceInfo from 'react-native-device-info';
import {resetAppData, setForceUpdate} from '../App/models/appActions';
import remoteConfig from '@react-native-firebase/remote-config';
import {dispatch} from './storeHelper';

export const checkMinimumVersionAndForceUpdate = async () => {
  try {
    const appVersionString = DeviceInfo.getVersion();
    const appVersionNumber = parseFloat(appVersionString);

    await remoteConfig().setDefaults({
      minimum_version: 1.0,
      force_update: false,
    });

    await remoteConfig().fetch();
    await remoteConfig().activate();

    const minimumVersion = remoteConfig()
      .getValue('minimum_version')
      .asNumber();

    const forceUpdate = remoteConfig().getValue('force_update').asBoolean();

    if (forceUpdate && appVersionNumber < minimumVersion) {
      dispatch(resetAppData());
      dispatch(setForceUpdate(true));
    } else {
      dispatch(setForceUpdate(false));
    }
  } catch (error) {
    // Handle any errors that might occur during the execution
    console.error('Error occurred:', error);
  }
};
