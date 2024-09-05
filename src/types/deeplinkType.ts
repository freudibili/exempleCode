import {FirebaseDynamicLinksTypes} from '@react-native-firebase/dynamic-links';

export type DeeplinkType =
  FirebaseDynamicLinksTypes.DynamicLinkSocialParameters & {id: string};
