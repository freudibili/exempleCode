import React, {useMemo} from 'react';
import {useAppSelector} from '../../../../../hooks/reduxHook';
import BottomBar from '../../../../components/BottomBar/BottomBar';
import {
  getUserId,
  getUserOrders,
} from '../../../User/models/user/userSelectors';
import {TROC_ITEM_STATUS, TrocItemType} from '../../types/TrocItemsType';
import TrocItemActionButtons from './TrocItemActionButtons/TrocItemActionButtons';
import TrocItemActionOrdered from './TrocItemActionOrdered/TrocItemActionOrdered';
import TrocItemActionOwn from './TrocItemActionOwn/TrocItemActionOwn';
import {getUserIsAuth} from '../../../Auth/models/authSelectors';
import TrocItemActionNotAuth from './TrocItemActionNotAuth/TrocItemActionNotAuth';
import {getTermsAccepted} from '../../../../models/appSelectors';
import {getIsOtherUserBlocked} from '../../models/trocItemSelectors';
import {Text} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import i18n from '../../../../utils/i18n';

type Props = {
  trocItem: TrocItemType;
};

const TrocItemActions = ({trocItem}: Props) => {
  const isAuth = useAppSelector(getUserIsAuth);
  const termsAccepted = useAppSelector(getTermsAccepted);
  const userId = useAppSelector(getUserId);
  const userOrders = useAppSelector(getUserOrders);
  const isOtherUserBlocked = useAppSelector(getIsOtherUserBlocked);

  const actionItems = useMemo(() => {
    if (!isAuth || !termsAccepted) {
      return <TrocItemActionNotAuth />;
    } else if (isOtherUserBlocked) {
      return (
        <Text style={styles.textContainer}>
          {i18n.t('TROC_ITEM_ACTION_USER_BLOCKED')}
        </Text>
      );
    } else if (trocItem.creator._id === userId) {
      return <TrocItemActionOwn trocItem={trocItem} />;
    } else {
      const orderedItem = userOrders.find(
        order => order.trocItem.id === trocItem._id,
      );
      if (orderedItem) {
        return <TrocItemActionOrdered orderId={orderedItem._id} />;
      } else if (trocItem.status === TROC_ITEM_STATUS.COMPLETED) {
        return (
          <Text style={styles.textContainer}>
            {i18n.t('TROC_ITEM_ACTION_ITEM_COMPLETED')}
          </Text>
        );
      } else {
        return <TrocItemActionButtons trocItem={trocItem} />;
      }
    }
  }, [isAuth, termsAccepted, isOtherUserBlocked, trocItem, userId, userOrders]);

  return <BottomBar>{actionItems}</BottomBar>;
};

const styles = StyleSheet.create({
  textContainer: {
    textAlign: 'center',
  },
});

export default TrocItemActions;
