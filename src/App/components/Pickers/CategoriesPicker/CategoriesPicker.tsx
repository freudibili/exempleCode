import React, {
  ReactElement,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {View, StyleSheet, FlatList, ViewStyle} from 'react-native';
import {useAppSelector} from '../../../../hooks/reduxHook';
import {
  getCategories,
  getCategoriesStatus,
} from '../../../modules/TrocItem/models/trocItemSelectors';
import StatusLoader from '../../StatusLoader/StatusLoader';
import TitleForm from '../../Texts/TitleForm/TitleForm';
import CategoryPicker from './CategoryPicker/CategoryPicker';
import ValidationFormError from '../../ValidationFormError/ValidationFormError';
import i18n from '../../../utils/i18n';
import {getLocales} from 'react-native-localize';

interface Props {
  initValue?: string[];
  getDataCallback: (categoriesId: string[]) => void;
  horizontal?: boolean;
  error?: string;
  showTitle?: boolean;
  numberOfCollumn?: number;
  footer?: ReactElement;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
}

type CategoriesType = {
  id: string;
  title: string;
  isSelected: boolean;
}[];
const CategoriesPicker = memo(
  ({
    getDataCallback,
    initValue,
    horizontal,
    error,
    showTitle,
    numberOfCollumn = 3,
    footer,
    style,
    contentContainerStyle,
  }: Props) => {
    const fetchedCategories = useAppSelector(getCategories);
    const status = useAppSelector(getCategoriesStatus);
    const [categories, setCategories] = useState<CategoriesType>([]);

    const initCategories = useCallback(() => {
      const initialCategories = fetchedCategories.map(category => {
        let isSelected = false;

        if (initValue) {
          isSelected = initValue.includes(category._id);
        }

        const title =
          getLocales()[0].languageCode === 'fr' ? category.fr : category.en;

        return {id: category._id, title, isSelected};
      });

      setCategories(initialCategories);
    }, [fetchedCategories, initValue]);

    useEffect(() => {
      initCategories();
    }, [initCategories]);

    const sendcategories = useCallback(
      (updatedCategories: {id: string; isSelected: boolean}[]) => {
        const selectedCategories: string[] = [];
        updatedCategories.forEach(category => {
          if (category.isSelected) {
            selectedCategories.push(category.id);
          }
        });

        getDataCallback(selectedCategories);
      },
      [getDataCallback],
    );

    const updateCategories = useCallback(
      (id: string) => {
        const updatedCategories = categories.map(function (category) {
          if (category.id === id) {
            const isSelected = !category.isSelected;
            return {...category, isSelected};
          }
          return category;
        });

        setCategories(updatedCategories);
        sendcategories(updatedCategories);
      },
      [categories, sendcategories],
    );

    const getHorizontalCategoryItem = useCallback(
      (
        item: {id: string; title: string; isSelected: boolean},
        index: number,
      ) => {
        const marginLeft = index === 0 ? 0 : 10;
        return (
          <View style={{marginLeft}}>
            <CategoryPicker
              key={item.id + item.title}
              categoryId={item.id}
              title={item.title}
              isSelected={item.isSelected}
              onPressCallback={updateCategories}
              contained
            />
          </View>
        );
      },
      [updateCategories],
    );

    const getVerticalCategoryItem = useCallback(
      (
        item: {id: string; title: string; isSelected: boolean},
        index: number,
      ) => {
        const marginLeft = index % numberOfCollumn !== 0 ? 10 : 0;
        return (
          <CategoryPicker
            key={item.id + item.title}
            categoryId={item.id}
            title={item.title}
            isSelected={item.isSelected}
            onPressCallback={updateCategories}
            style={{marginLeft}}
          />
        );
      },
      [numberOfCollumn, updateCategories],
    );

    const orderCategories = useCallback((items: CategoriesType) => {
      // Sort updatedCategories to put selected categories before unselected ones
      return items.sort((a, b) => {
        if (a.isSelected && !b.isSelected) {
          return -1; // a comes before b
        }
        if (!a.isSelected && b.isSelected) {
          return 1; // b comes before a
        }
        return 0; // no change in order
      });
    }, []);

    const getCategoriesList = useMemo(() => {
      return horizontal ? (
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          style={[styles.horizontalFlatlistContainer, style]}
          contentContainerStyle={[
            styles.horizontalFlatlistContent,
            contentContainerStyle,
          ]}
          data={orderCategories(categories)}
          renderItem={({item, index}) => getHorizontalCategoryItem(item, index)}
        />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={numberOfCollumn}
          data={orderCategories(categories)}
          ItemSeparatorComponent={() => (
            <View style={styles.horizontalSpacing} />
          )}
          style={[styles.flatlistContainer, style]}
          contentContainerStyle={contentContainerStyle}
          renderItem={({item, index}) => getVerticalCategoryItem(item, index)}
          ListFooterComponent={footer}
        />
      );
    }, [
      horizontal,
      style,
      contentContainerStyle,
      orderCategories,
      categories,
      numberOfCollumn,
      footer,
      getHorizontalCategoryItem,
      getVerticalCategoryItem,
    ]);

    return (
      <View>
        {showTitle && (
          <TitleForm title={i18n.t('TROC_ITEM_CREATE_FORM_CATEGORIES_TITLE')} />
        )}
        {error && <ValidationFormError error={error} />}
        <StatusLoader status={status}>{getCategoriesList}</StatusLoader>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  horizontalFlatlistContainer: {
    marginVertical: 10,
  },
  flatlistContainer: {marginVertical: 10},
  filterButtonContainer: {
    flexGrow: 1,
    padding: 10,
    justifyContent: 'center',
  },
  horizontalFlatlistContent: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  horizontalSpacing: {marginTop: 10},
});
export default CategoriesPicker;
