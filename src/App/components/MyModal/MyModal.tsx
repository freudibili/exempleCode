import React, {memo} from 'react';
import {StyleSheet} from 'react-native';
import {Modal, Portal} from 'react-native-paper';
import designSystem from '../../utils/designSystem';
import CloseButton from '../Buttons/CloseButton/CloseButton';

interface Props {
  onClose: () => void;
  visible: boolean;
  children: JSX.Element;
}

const MyModal = ({onClose, visible, children}: Props) => {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        contentContainerStyle={styles.container}>
        {children}
        <CloseButton onPress={onClose} />
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: designSystem.theme.colors.background,
    borderRadius: 20,
    padding: 20,
    margin: 20,
  },
});
export default memo(MyModal);
