import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {TrocItemInputData} from '../../../../TrocItem/types/TrocItemsType';
import NegociateTrocItemCardItem from './NegociateTrocItemCardItem/NegociateTrocItemCardItem';

interface Props {
  trocItems: TrocItemInputData[];
  size: number;
  canInteract?: boolean;
}

const NegociateTrocItemCardItems = ({trocItems, size, canInteract}: Props) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={trocItems}
        renderItem={({item}) => (
          <NegociateTrocItemCardItem
            key={item._id}
            trocItem={item}
            size={size}
            canInteract={canInteract}
          />
        )}
        keyExtractor={item => item._id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default NegociateTrocItemCardItems;
