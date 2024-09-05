import React, {useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Button} from 'react-native-paper';
import {useAppDispatch, useAppSelector} from '../../../../../hooks/reduxHook';
import BottomBar from '../../../../components/BottomBar/BottomBar';
import CloseButton from '../../../../components/Buttons/CloseButton/CloseButton';
import PrimaryButton from '../../../../components/Buttons/PrimaryButton/PrimaryButton';
import CategoriesPicker from '../../../../components/Pickers/CategoriesPicker/CategoriesPicker';
import CategoryTypePicker from '../../../../components/Pickers/CategoryTypePicker';
import PositionPicker from '../../../../components/Pickers/PositionPicker';
import TrocTypePicker from '../../../../components/Pickers/TrocTypePicker';
import {AddressType, PositionType} from '../../../../types/locationType';
import designSystem from '../../../../utils/designSystem';
import {goBack} from '../../../../utils/navigationHelper';
import {setExploreFiltersRequest} from '../../models/exploreActions';
import {getExploreFilters} from '../../models/exploreSelectors';
import {ExploreFilterType} from '../../types/ExploreType';
import {LOCATION_DISTANCE_DEFAULT} from '../../../../../utils/locationHelper';
import i18n from '../../../../utils/i18n';

const ExploreFilterContent = () => {
  const [address, setAddress] = useState<AddressType | undefined>();
  const [distance, setDistance] = useState<number | undefined>();
  const [trocTypeId, setTrocTypeId] = useState<string | null>();
  const [categoryTypeId, setCategoryTypeId] = useState<string | null>();
  const [categoriesId, setCategoriesId] = useState<string[] | undefined>();

  const dispatch = useAppDispatch();
  let currentFilters: ExploreFilterType = useAppSelector(getExploreFilters);

  const updatedFilters = useCallback(() => {
    const filters: ExploreFilterType = {
      address,
      distance,
      trocTypeId,
      categoryTypeId,
      categoriesId,
      search: '',
    };

    dispatch(setExploreFiltersRequest(filters));
    goBack();
  }, [address, distance, trocTypeId, categoryTypeId, categoriesId, dispatch]);

  const deleteFilters = useCallback(async () => {
    const filters: ExploreFilterType = {
      distance: LOCATION_DISTANCE_DEFAULT,
      trocTypeId: null,
      categoryTypeId: null,
      categoriesId: [],
      search: '',
    };
    dispatch(setExploreFiltersRequest(filters));
    goBack();
  }, [dispatch]);

  const handlePosition = useCallback((position: PositionType) => {
    setAddress(position.address);
    setDistance(position.distance);
  }, []);

  return (
    <View style={designSystem.styles.customStyle.containerModal}>
      <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'}>
        <View style={designSystem.styles.customStyle.contentContainer}>
          <TrocTypePicker
            initValue={currentFilters.trocTypeId}
            getDataCallback={id => {
              setTrocTypeId(id.length > 0 ? id : null);
            }}
            enableNoSelection
          />
          <CategoryTypePicker
            initValue={currentFilters.categoryTypeId}
            getDataCallback={id => {
              setCategoryTypeId(id.length > 0 ? id : null);
            }}
            enableNoSelection
          />
          <CategoriesPicker
            initValue={currentFilters.categoriesId}
            getDataCallback={setCategoriesId}
            numberOfCollumn={4}
            showTitle
          />
          <PositionPicker
            initValue={{
              distance: currentFilters.distance,
              address: currentFilters.address,
            }}
            getDataCallback={handlePosition}
          />
        </View>
      </KeyboardAwareScrollView>
      <BottomBar inModal>
        <View style={styles.bottomBarContent}>
          <Button onPress={deleteFilters}>
            {i18n.t('EXPLORE_MODAL_LOCATION_DELETE_FILTER_BUTTON')}
          </Button>
          <PrimaryButton
            onPress={updatedFilters}
            label={i18n.t('EXPLORE_MODAL_LOCATION_FILTER_BUTTON')}
          />
        </View>
      </BottomBar>
      <CloseButton />
    </View>
  );
};

const styles = StyleSheet.create({
  bottomBarContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ExploreFilterContent;
