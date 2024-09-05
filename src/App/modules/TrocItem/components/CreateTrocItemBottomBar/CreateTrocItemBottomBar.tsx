import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, ProgressBar} from 'react-native-paper';
import BottomBar from '../../../../components/BottomBar/BottomBar';
import designSystem from '../../../../utils/designSystem';
import {CreateOfferProductFormValues} from '../../types/createFormType';
import i18n from '../../../../utils/i18n';

interface Props {
  values: CreateOfferProductFormValues;
  onPressNext: () => void;
  onPressPrevious: () => void;
}
const CreateTrocItemBottomBar = ({
  values,
  onPressPrevious,
  onPressNext,
}: Props) => {
  const {currentStepIndex, steps} = values;
  const progression = currentStepIndex / (steps.length - 1);

  const displayPreviousButton = currentStepIndex > 0;
  const isLastStep = currentStepIndex >= steps.length - 1;

  return (
    <BottomBar style={styles.bottomBar}>
      <>
        <ProgressBar
          progress={progression}
          theme={{
            colors: {
              surfaceVariant: designSystem.theme.colors.outlineVariant,
            },
          }}
        />
        <View style={styles.contentContainer}>
          <View>
            {displayPreviousButton && (
              <Button onPress={onPressPrevious}>
                {i18n.t('TROC_ITEM_CREATE_PREVIOUS_BUTTON')}
              </Button>
            )}
          </View>
          <Button onPress={onPressNext} mode={'contained'}>
            {isLastStep
              ? i18n.t('TROC_ITEM_CREATE_FORM_SUBMIT')
              : i18n.t('TROC_ITEM_CREATE_NEXT_BUTTON')}
          </Button>
        </View>
      </>
    </BottomBar>
  );
};

const styles = StyleSheet.create({
  bottomBar: {
    backgroundColor: designSystem.theme.colors.background,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
});

export default CreateTrocItemBottomBar;
