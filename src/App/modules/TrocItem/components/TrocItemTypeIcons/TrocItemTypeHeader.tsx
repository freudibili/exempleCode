import * as React from 'react';
import {StyleSheet, View} from 'react-native';

import designSystem from '../../../../utils/designSystem';
import TrocItemTypeIconFull from './TrocItemTypeIconFull/TrocItemTypeIconFull';

interface Props {
  trocTypeId: string;
  categoryTypeId: string;
}
const TrocItemTypeHeader = ({trocTypeId, categoryTypeId}: Props) => (
  <View style={styles.container}>
    <TrocItemTypeIconFull
      trocTypeId={trocTypeId}
      categoryTypeId={categoryTypeId}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingRight: 60,
    padding: 20,
    backgroundColor: designSystem.theme.colors.secondaryContainer,
  },
  title: {marginBottom: 20},
});
export default TrocItemTypeHeader;
