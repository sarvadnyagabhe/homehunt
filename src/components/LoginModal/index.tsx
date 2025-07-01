import React from 'react';
import {Image, Modal, Pressable, StyleSheet, View} from 'react-native';
import MagicText from '../MagicText';
import {COLORS} from '../../assets/colors';
import {IMAGE} from '../../assets/images';

type LoginModalProps = {
  isVisible: boolean;
  closeModal: () => void;
};

const LoginModal = ({
  isVisible = false,
  closeModal = () => {},
}: LoginModalProps) => {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={isVisible}
      onRequestClose={closeModal}>
      <Pressable style={styles.parent} onPress={closeModal}>
        <Pressable style={styles.container} onPress={() => {}}>
          <View style={styles.row}>
            <View style={styles.iconContainer}>
              <Image source={IMAGE.LockIcon} style={styles.icon} />
            </View>
            <View style={styles.textContainer}>
              <MagicText style={styles.titleText}>Login</MagicText>
              <MagicText style={styles.subText}>
                Login to view all details and access all the features.
              </MagicText>
            </View>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: COLORS.MODAL_BACKGROUND,
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  container: {
    backgroundColor: COLORS.GRAY,
    padding: 10,
    borderRadius: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  icon: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  textContainer: {
    flex: 1,
  },
  titleText: {
    fontSize: 20,
    lineHeight: 30,
    fontWeight: 'bold',
    color: COLORS.BLACK,
  },
  subText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    color: COLORS.BLACK,
  },
});

export default LoginModal;
