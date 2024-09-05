import dynamicLinks from '@react-native-firebase/dynamic-links';
import {Share} from 'react-native';
import config from '../../utils/config';
import {DeeplinkType} from '../../types/deeplinkType';

export const buildLink = async (deeplinkParams: DeeplinkType) => {
  try {
    const link = await dynamicLinks().buildShortLink(
      {
        link: `https://andswap.page.link/29hQ?trocItemId=${deeplinkParams.id}`,

        domainUriPrefix: 'https://andswap.page.link',
        android: {
          packageName: config.ANDROID_PACKAGE_NAME,
        },
        ios: {
          appStoreId: config.IOS_APP_ID,
          bundleId: config.IOS_BUNDLE_ID,
        },
        social: deeplinkParams,
        analytics: {
          campaign: 'banner',
        },
      },
      dynamicLinks.ShortLinkType.DEFAULT,
    );

    return link;
  } catch (err) {
    console.error(err);
  }
};

export const shareProduct = async (
  deeplinkParams: DeeplinkType,
): Promise<boolean> => {
  const getLink = await buildLink(deeplinkParams);

  if (!getLink) {
    return false;
  }

  try {
    await Share.share({message: getLink});
    return true;
  } catch (error) {
    console.error('Sharing Error:', error);
    return false;
  }
};
