import React, {useCallback, useState} from 'react';
import designSystem from '../../../utils/designSystem';
import {SafeAreaView, StyleSheet} from 'react-native';
import ExploreContent from '../components/contents/ExploreContent';
import ExploreTopBar from '../components/ExploreTopBar/ExploreTopBar';
import ExploreUserBar from '../components/ExploreUserBar/ExploreUserBar';
import {useAppSelector} from '../../../../hooks/reduxHook';
import {getShouldRate} from '../../../models/appSelectors';
import {navigate} from '../../../utils/navigationHelper';
import {NAVIGATION} from '../../../types/navigationTypes';
import {useFocusEffect} from '@react-navigation/native';

const ExploreScreen = () => {
  const shouldRate = useAppSelector(getShouldRate);

  const [isRatingModalShown, setIsRatingModalShow] = useState(false);

  // TODO move this code in navigator
  useFocusEffect(
    useCallback(() => {
      if (shouldRate && !isRatingModalShown) {
        const timeoutId = setTimeout(() => {
          navigate({screen: NAVIGATION.RATING_MODAL});
          setIsRatingModalShow(true);
        }, 1000);

        return () => clearTimeout(timeoutId);
      }
    }, [shouldRate, isRatingModalShown]),
  );

  return (
    <SafeAreaView
      style={[designSystem.styles.customStyle.container, styles.container]}>
      <ExploreUserBar />
      <ExploreTopBar />
      <ExploreContent />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({container: {paddingTop: 20}});
export default ExploreScreen;
