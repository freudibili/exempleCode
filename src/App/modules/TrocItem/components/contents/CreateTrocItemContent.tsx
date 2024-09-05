import {useFormikContext} from 'formik';
import React, {useCallback, useMemo, useRef} from 'react';
import {CreateOfferProductFormValues} from '../../types/createFormType';
import CreateTrocItemBottomBar from '../CreateTrocItemBottomBar/CreateTrocItemBottomBar';
import {StyleSheet, View} from 'react-native';
import {CREATE_TROC_ITEM_STEPS} from '../../types/CreateTrocItemsType';
import CreateTrocItemFormInfoSection from '../forms/sections/CreateTrocItemFormInfoSection';
import CreateTrocItemFormQualitySection from '../forms/sections/CreateTrocItemFormQualitySection';
import CreateTrocItemFormExchangeSection from '../forms/sections/CreateTrocItemFormExchangeSection';
import CreateTrocItemFormLocationSection from '../forms/sections/CreateTrocItemFormLocationSection';

const CreateTrocItemContent = () => {
  interface ChildRef {
    handleNextFromParent: () => void;
  }

  const childRef = useRef<ChildRef | null>(null);
  const {values, setFieldValue, handleSubmit} =
    useFormikContext<CreateOfferProductFormValues>();

  const {currentStepIndex, steps} = values;

  const goToPrevious = () => {
    const previousStepIndex = currentStepIndex - 1;
    setFieldValue('currentStepIndex', previousStepIndex);
  };

  const goToNext = useCallback(() => {
    const isLastStep = currentStepIndex >= steps.length - 1;
    const nextStepIndex = currentStepIndex + 1;

    if (!isLastStep) {
      setFieldValue('currentStepIndex', nextStepIndex);
    } else {
      handleSubmit();
    }
  }, [currentStepIndex, setFieldValue, steps.length, handleSubmit]);

  const handleNext = () => {
    if (childRef.current) {
      childRef.current.handleNextFromParent();
    }
  };

  const formContent = useMemo(() => {
    switch (steps[currentStepIndex]) {
      case CREATE_TROC_ITEM_STEPS.INFOS_STEP:
        return (
          <CreateTrocItemFormInfoSection ref={childRef} onValidate={goToNext} />
        );
      case CREATE_TROC_ITEM_STEPS.QUALITY_STEP:
        return (
          <CreateTrocItemFormQualitySection
            ref={childRef}
            onValidate={goToNext}
          />
        );
      case CREATE_TROC_ITEM_STEPS.EXCHANGE_STEP:
        return (
          <CreateTrocItemFormExchangeSection
            ref={childRef}
            onValidate={goToNext}
          />
        );
      case CREATE_TROC_ITEM_STEPS.LOCATION_STEP:
        return (
          <CreateTrocItemFormLocationSection
            ref={childRef}
            onValidate={goToNext}
          />
        );

      default:
        return null;
    }
  }, [currentStepIndex, goToNext, steps]);

  return (
    <View style={styles.contentContainer}>
      {formContent}
      <CreateTrocItemBottomBar
        values={values}
        onPressPrevious={goToPrevious}
        onPressNext={handleNext}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

export default CreateTrocItemContent;
