export const getPopupOffset = ({ width, height }) => {
  const wLeft = window.screenLeft ? window.screenLeft : window.screenX;
  const wTop = window.screenTop ? window.screenTop : window.screenY;

  const left = wLeft + (window.innerWidth / 2) - (width / 2); // eslint-disable-line no-mixed-operators
  const top = wTop + (window.innerHeight / 2) - (height / 2); // eslint-disable-line no-mixed-operators

  return { top, left };
};

export const getPopupDimensions = (width, height) => {
  const { top, left } = getPopupOffset({ width, height });
  return `width=${width},height=${height},top=${top},left=${left}`;
};

// Get user agent in browser.
export const userAgent = window.navigator.userAgent;

export const getBrowserInnerWidth = () => window.innerWidth;
export const getBrowserInnerHeight = () => window.innerHeight;

// Check type of browser
export const getBrowserName = () => {
  let sBrowser;

  if (userAgent.indexOf('Chrome') > -1) {
    sBrowser = 'Google Chrome';
  } else if (userAgent.indexOf('Safari') > -1) {
    sBrowser = 'Apple Safari';
  } else if (userAgent.indexOf('Opera') > -1) {
    sBrowser = 'Opera';
  } else if (userAgent.indexOf('Firefox') > -1) {
    sBrowser = 'Mozilla Firefox';
  } else if (userAgent.indexOf('MSIE') > -1) {
    sBrowser = 'Microsoft Internet Explorer';
  }

  return sBrowser;
};

// Detect resize events
export const optimizedResize = (function optimizedResizeCreator() {
  const callbacks = [];
  let running = false;

  // fired on resize event
  function resize() {
    if (!running) {
      running = true;

      if (window.requestAnimationFrame) {
        window.requestAnimationFrame(runCallbacks);
      } else {
        setTimeout(runCallbacks, 66);
      }
    }
  }

  // run the actual callbacks
  function runCallbacks() {
    callbacks.forEach((callback) => {
      callback();
    });
    running = false;
  }

  // adds callback to loop
  function addCallback(callback) {
    if (callback) {
      callbacks.push(callback);
    }
  }

  return {
    // public method to add additional callback
    add: (callback) => {
      if (!callbacks.length) {
        window.addEventListener('resize', resize);
      }
      addCallback(callback);
    }
  };
}());

// // start process
// optimizedResize.add(() => {
//   console.log('Resource conscious resize callback!');
//   // Dispatch resize action to store
// });
