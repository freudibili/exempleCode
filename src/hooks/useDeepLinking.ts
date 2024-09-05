import {useCallback, useEffect} from 'react';
import dynamicLinks, {
  FirebaseDynamicLinksTypes,
} from '@react-native-firebase/dynamic-links';
import {navigate} from '../App/utils/navigationHelper';
import {NAVIGATION, STACK} from '../App/types/navigationTypes';

const navigateToTroc = (link: FirebaseDynamicLinksTypes.DynamicLink) => {
  let trocItemId = link.url.split('=').pop();
  if (trocItemId) {
    navigate({
      stack: STACK.TROC_ITEM_STACK,
      screen: NAVIGATION.TROC_ITEM_SCREEN,
      params: {id: trocItemId},
    });
  }
};

const useDeepLinking = () => {
  const handleDynamicLinks = useCallback(
    async (link: FirebaseDynamicLinksTypes.DynamicLink) => {
      navigateToTroc(link);
    },
    [],
  );

  useEffect(() => {
    dynamicLinks()
      .getInitialLink()
      .then(link => {
        if (link) {
          // We add a timer here in order to wait that the app is ready before navigation
          setTimeout(() => navigateToTroc(link), 1000);
        }
      });
  }, []);

  useEffect(() => {
    const unsubscribe = dynamicLinks().onLink(handleDynamicLinks);
    return () => unsubscribe();
  }, [handleDynamicLinks]);
};

export default useDeepLinking;
