/*
 * OrderSummary Messages
 *
 * This contains all the text for the OrderSummary component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  name: {
    id: 'app.components.common.OrderSummary.name',
    defaultMessage: 'Name',
  },
  quantityAndPrice: {
    id: 'app.components.common.OrderSummary.quantityAndPrice',
    defaultMessage: 'Qty / Price',
  },
  shipping: {
    id: 'app.components.common.OrderSummary.shipping',
    defaultMessage: 'Shipping',
  },
  subTotal: {
    id: 'app.components.common.OrderSummary.subTotal',
    defaultMessage: 'Sub-total',
  },
  total: {
    id: 'app.components.common.OrderSummary.total',
    defaultMessage: 'Total',
  },
});
