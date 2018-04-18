/*
 * OrderStatus Messages
 *
 * This contains all the text for the OrderStatus component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  created: {
    id: 'app.components.common.OrderStatus.created',
    defaultMessage: 'Created',
  },
  pendingPayment: {
    id: 'app.components.common.OrderStatus.pendingPayment',
    defaultMessage: 'Pending Payment',
  },
  paymentError: {
    id: 'app.components.common.OrderStatus.paymentError',
    defaultMessage: 'Payment Error',
  },
  paid: {
    id: 'app.components.common.OrderStatus.paid',
    defaultMessage: 'Paid',
  },
  canceled: {
    id: 'app.components.common.OrderStatus.canceled',
    defaultMessage: 'Canceled',
  },
  processing: {
    id: 'app.components.common.OrderStatus.processing',
    defaultMessage: 'Processing',
  },
  ready: {
    id: 'app.components.common.OrderStatus.ready',
    defaultMessage: 'Ready',
  },
  shipped: {
    id: 'app.components.common.OrderStatus.shipped',
    defaultMessage: 'Shipped',
  },
});
