import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import FeedBackSender from '../Rating/FeedBackSender';
import RatingSender from '../Rating/RatingSender';
import designSystem from '../../utils/designSystem';
import {Text} from 'react-native-paper';
import {getWidth} from '../../utils/responsiveHelper';
import {getRatingMessage} from '../../utils/textHelper';
import i18n from '../../utils/i18n';
import {useAppDispatch} from '../../../hooks/reduxHook';
import {setAppRated} from '../../models/appActions';

interface Props {
  onClose: () => void;
}
const RatingContent = ({onClose}: Props) => {
  const [rating, setRating] = useState(0);
  const dispatch = useAppDispatch();

  const width = getWidth;
  const handleStarPress = (selectedRating: number) => {
    setRating(selectedRating);
  };

  const iconName =
    rating >= 4 || !rating ? 'smile' : rating >= 2 ? 'meh' : 'frown';

  const shouldRate = rating >= 5;

  const onComplete = () => {
    dispatch(setAppRated());
    onClose();
  };

  return (
    <View style={styles.container}>
      <View style={styles.faceContainer}>
        {shouldRate && (
          <IconFontAwesome
            name="star"
            size={width * 0.05}
            color={designSystem.theme.colors.primary}
          />
        )}
        <View style={styles.faceIcon}>
          <Icon
            name={iconName}
            size={width * 0.2}
            color={designSystem.theme.colors.primary}
          />
        </View>
        {shouldRate && (
          <IconFontAwesome
            name="star"
            size={width * 0.05}
            color={designSystem.theme.colors.primary}
          />
        )}
      </View>
      <Text style={styles.title} variant={'titleMedium'}>
        {i18n.t('APP_RATING_TITLE')}
      </Text>
      <Text style={styles.subtitle} variant={'bodyMedium'}>
        {getRatingMessage(rating)}
      </Text>
      <View style={styles.starContainer}>
        {[1, 2, 3, 4, 5].map(index => (
          <TouchableOpacity
            key={index}
            onPress={() => handleStarPress(index)}
            style={styles.star}>
            <IconFontAwesome
              name={index <= rating ? 'star' : 'star-o'}
              size={40}
              color={designSystem.theme.colors.tertiary}
            />
          </TouchableOpacity>
        ))}
      </View>
      {rating > 0 && (
        <>
          <View style={styles.inputContainer}>
            {shouldRate ? (
              <RatingSender onComplete={onComplete} />
            ) : (
              <FeedBackSender onComplete={onComplete} rating={rating} />
            )}
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  faceContainer: {flexDirection: 'row', alignItems: 'center'},
  faceIcon: {marginHorizontal: 10},
  title: {
    marginTop: 20,
    textAlign: 'center',
  },
  subtitle: {marginTop: 10, textAlign: 'center'},
  starContainer: {
    marginTop: 20,
    flexDirection: 'row',
    marginBottom: 30,
  },
  star: {
    marginHorizontal: 5,
  },
  inputContainer: {
    width: '100%',
  },
});

export default RatingContent;
