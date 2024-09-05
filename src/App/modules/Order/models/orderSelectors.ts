import {RootState} from '../../../../models/store';
import {OrderInputData} from '../types/OrdersType';

const getOrderStatus = (state: RootState) => state.order.status;
const getOrder = (state: RootState) => state.order.order as OrderInputData;
export {getOrderStatus, getOrder};
