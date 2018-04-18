import {
  APPLICATION_PAGE_WIDTH_CHANGED,
  APPLICATION_MOBILE_BREAKPOINT_SET
} from './application.type';


export function pageWidthChanged(width) {
  return {
    type: APPLICATION_PAGE_WIDTH_CHANGED,
    payload: width
  };
}

export function setMobileBreakpoint(isMobile) {
  return {
    type: APPLICATION_MOBILE_BREAKPOINT_SET,
    payload: isMobile
  };
}

export default {};
