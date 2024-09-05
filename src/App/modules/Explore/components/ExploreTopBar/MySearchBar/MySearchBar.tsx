import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Searchbar} from 'react-native-paper';
import {useAppDispatch} from '../../../../../../hooks/reduxHook';
import useDebounce from '../../../../../../hooks/useDebounce';
import designSystem from '../../../../../utils/designSystem';
import {setExploreFiltersRequest} from '../../../models/exploreActions';
import Icon from 'react-native-vector-icons/Feather';
import i18n from '../../../../../utils/i18n';

const MySearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isInit, setIsInit] = useState(false);
  const debouncedValue = useDebounce<string>(searchQuery, 1000);
  const dispatch = useAppDispatch();

  const handleChange = useCallback((query: string) => {
    setIsInit(true);
    setSearchQuery(query);
  }, []);

  useEffect(() => {
    if (isInit) {
      dispatch(
        setExploreFiltersRequest({
          search: debouncedValue,
        }),
      );
    }
  }, [debouncedValue, dispatch, isInit]);

  return (
    <View>
      <Searchbar
        elevation={0}
        style={styles.searchBar}
        inputStyle={styles.inputColor}
        placeholderTextColor={designSystem.theme.colors.onSurfaceDisabled}
        placeholder={i18n.t('EPLORE_SEARCH_BAR_PLACEHOLDER')}
        onChangeText={handleChange}
        value={searchQuery}
        icon={() => (
          <Icon
            name="search"
            size={20}
            color={designSystem.theme.colors.onSurfaceVariant}
          />
        )}
        clearIcon={({color}) => {
          // React native paper handle button with opacity so we need to check the value to display/hide the close button
          if (color === 'rgba(255, 255, 255, 0)') {
            return null;
          }
          return (
            <Icon
              name="x"
              size={20}
              color={designSystem.theme.colors.onSurfaceVariant}
            />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {backgroundColor: 'transparent'},
  inputColor: {color: designSystem.theme.colors.onSurface},
});

export default MySearchBar;
