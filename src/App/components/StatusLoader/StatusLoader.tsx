import React from 'react';
import {STATUS} from '../../types/storeTypes';
import {ActivityIndicator} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';

type Props = {
  status: STATUS;
  children: JSX.Element;
};

const StatusLoader: React.FC<Props> = ({status, children}) => {
  if (status !== STATUS.SUCCESS) {
    return (
      <View style={styles.container}>
        <ActivityIndicator animating={true} />
      </View>
    );
  }
  return children;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default StatusLoader;
