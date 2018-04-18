import * as ActionTypes from './application.type';


export function triggerDrawer(drawer) {
  return {
    type: ActionTypes.APPLICATION_DRAWER_TRIGGER,
    payload: drawer
  };
}

export default {
  triggerDrawer,
};
