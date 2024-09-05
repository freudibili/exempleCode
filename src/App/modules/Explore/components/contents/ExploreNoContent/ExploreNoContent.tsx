import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {NAVIGATION} from '../../../../../types/navigationTypes';
import {navigate} from '../../../../../utils/navigationHelper';
import i18n from '../../../../../utils/i18n';

const ExploreNoContent = () => {
  const goToCreateProduct = useCallback(() => {
    const params = {};
    navigate({screen: NAVIGATION.TROC_ITEM_CREATE_PRODUCT_SCREEN, params});
  }, []);

  return (
    <View style={styles.noConversation}>
      <Text>{i18n.t('EXPLORE_NO_TROC_FOUND')}</Text>
      <Button
        mode={'contained'}
        onPress={goToCreateProduct}
        style={styles.button}>
        {i18n.t('EXPLORE_NO_TROC_FOUND_CREATE')}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  noConversation: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginTop: 20,
  },
});

export default ExploreNoContent;
