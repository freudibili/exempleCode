import React, {useCallback} from 'react';
import BottomSheet from '../../../../components/BottomSheet/BottomSheet';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import designSystem from '../../../../utils/designSystem';
import {useAppDispatch, useAppSelector} from '../../../../../hooks/reduxHook';
import {getTrocItem} from '../../models/trocItemSelectors';
import {reportTrocItemRequest} from '../../models/trocItemActions';
import {useBottomSheet} from '../../../../utils/BottomSheetContext';
import {shareProduct} from '../../../../utils/deeplink';
import {downloadImage} from '../../../../services/filesApi';
import {IMAGE_TYPE} from '../../../../../types/imageType';
import config from '../../../../../utils/config';
import i18n from '../../../../utils/i18n';

const TrocItemMoreModal = () => {
  const {closeBottomSheet} = useBottomSheet();
  const trocItem = useAppSelector(getTrocItem);
  const dispatch = useAppDispatch();

  const reportItem = useCallback(() => {
    dispatch(reportTrocItemRequest(trocItem._id));
    closeBottomSheet();
  }, [closeBottomSheet, dispatch, trocItem]);

  const shareItem = useCallback(async () => {
    let imageUrl = config.APP_ICON;

    if (trocItem.imagesUrl.length > 0 && trocItem.imagesUrl[0].length > 0) {
      const {imageUrl: downloadImageUrl} = await downloadImage({
        imageId: trocItem.imagesUrl[0],
        imageType: IMAGE_TYPE.TROC_ITEM,
      });

      imageUrl = downloadImageUrl;
    }

    const sharing = await shareProduct({
      id: trocItem._id,
      title: trocItem.title,
      descriptionText: trocItem.description,
      imageUrl,
    });
    if (sharing) {
      closeBottomSheet();
    }
  }, [closeBottomSheet, trocItem]);

  return (
    <BottomSheet>
      <>
        <TouchableOpacity style={styles.container} onPress={shareItem}>
          <Icon
            name="share-2"
            size={20}
            style={styles.icon}
            color={designSystem.theme.colors.onSurface}
          />
          <Text>{i18n.t('TROC_ITEM_SHARE_BUTTON')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.container} onPress={reportItem}>
          <Icon
            name="slash"
            size={20}
            style={styles.icon}
            color={designSystem.theme.colors.onSurface}
          />
          <Text>{i18n.t('TROC_ITEM_SIGNAL_BUTTON')}</Text>
        </TouchableOpacity>
      </>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
});
export default TrocItemMoreModal;
