import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
  Animated,
  TouchableWithoutFeedback,
  Easing, // Import Animated from react-native
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import designSystem from '../../utils/designSystem';
import {goBack} from '../../utils/navigationHelper';
import CloseButton from '../Buttons/CloseButton/CloseButton';
import {getHeight} from '../../utils/responsiveHelper';
import {useBottomSheet} from '../../utils/BottomSheetContext';

type Props = {
  children: JSX.Element;
  isScrollView?: boolean;
  showCloseButton?: boolean;
};

const BottomSheet = ({children, isScrollView, showCloseButton}: Props) => {
  const [firstOpening, setFirstOpening] = useState(true);
  const insets = useSafeAreaInsets();
  const paddingBottom = insets.bottom + 20;
  const marginTop = insets.top + 20;
  const height = getHeight;
  const {isOpen, openBottomSheet} = useBottomSheet();

  // Define the backdrop opacity as an Animated value
  const opacityAnimation = useRef(new Animated.Value(0)).current;

  const showBackDrop = useCallback(() => {
    Animated.timing(opacityAnimation, {
      toValue: 1,
      duration: 300,
      delay: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, [opacityAnimation]);

  const hideBackDrop = useCallback(() => {
    Animated.timing(opacityAnimation, {
      toValue: 0,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      goBack();
    });
  }, [opacityAnimation]);

  useEffect(() => {
    showBackDrop();
  }, [showBackDrop]);

  useEffect(() => {
    if (firstOpening) {
      openBottomSheet();
      setFirstOpening(false);
    } else if (!isOpen) {
      hideBackDrop();
    }
  }, [firstOpening, hideBackDrop, isOpen, openBottomSheet]);

  const myChildren = useMemo(() => {
    const content = isScrollView ? (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={hideBackDrop}>
          <Animated.View
            style={[styles.backdrop, {opacity: opacityAnimation}]}
          />
        </TouchableWithoutFeedback>
        <View
          style={[
            styles.children,
            {paddingBottom, maxHeight: height - marginTop},
          ]}>
          <KeyboardAwareScrollView
            keyboardShouldPersistTaps={'handled'}
            showsVerticalScrollIndicator={false}>
            {children}
          </KeyboardAwareScrollView>
          <CloseButton onPress={hideBackDrop} />
        </View>
      </View>
    ) : (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={-paddingBottom}
        style={styles.KeyBoardContainer}>
        <View style={styles.container}>
          <TouchableWithoutFeedback
            onPress={() => {
              hideBackDrop();
            }}>
            <Animated.View
              style={[styles.backdrop, {opacity: opacityAnimation}]}
            />
          </TouchableWithoutFeedback>
          <View style={[styles.children, {paddingBottom}]}>
            {children}
            {showCloseButton && <CloseButton onPress={hideBackDrop} />}
          </View>
        </View>
      </KeyboardAvoidingView>
    );

    return content;
  }, [
    children,
    height,
    hideBackDrop,
    isScrollView,
    marginTop,
    opacityAnimation,
    paddingBottom,
    showCloseButton,
  ]);

  return <>{myChildren}</>;
};

const styles = StyleSheet.create({
  KeyBoardContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    backgroundColor: designSystem.theme.colors.backdrop,
    height: '100%',
  },
  children: {
    position: 'absolute',
    padding: 20,
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: designSystem.theme.colors.background,
  },
});

export default BottomSheet;
