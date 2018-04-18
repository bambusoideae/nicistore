import RequestWatcher from './request-watcher';
import { getToken } from './authentication';
import config from '../config';

// let _headers = {
//   Accept: 'application/json',
//   'Content-Type': 'application/json'
// };

// export function headers() {
//   return _headers;
// }

export function parseJSON(response) {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(response);
}

// export function updateHeaders(newHeaders) {
//   _headers = { ..._headers, ...newHeaders };
//   Object.keys(_headers).forEach((key) => {
//     if (undefined === _headers[key]) {
//       delete _headers[key];
//     }
//   });
// }

export function uploadRequest(path, body, options, contentType) {
  return getToken().then((idToken) => {
    // console.log(`Token: ${idToken}`);
    // Update idToken
    const headers = {
      Accept: 'application/json',
    };

    if (idToken) {
      headers.Authorization = `Bearer ${idToken}`;
    }

    if (contentType && contentType !== 'multipart/form-data') {
      headers['Content-Type'] = contentType;
    }

    const defaultOptions = {
      method: 'POST',
      headers,
    };

    options = { ...defaultOptions, ...options, ...{ body } };

    return fetch(getApiUri(path), options).then(parseJSON);
  });
}

export function restRequest(path, options) {
  return getToken().then((idToken) => {
    // console.log(`Token: ${idToken}`);
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    // Update idToken
    if (idToken) {
      headers.Authorization = `Bearer ${idToken}`;
    }

    const defaultOptions = {
      method: 'GET',
      headers,
    };

    options = { ...defaultOptions, ...options };

    return fetch(getApiUri(path), options).then(parseJSON);
  });
}

export function getApiUri(path) {
  let base = config.api;
  if (typeof base === 'string' && typeof path === 'string') {
    if (base.endsWith('/')) {
      base = base.substr(0, base.length - 1);
    }

    let uri;

    if (!path.startsWith('/')) {
      uri = `${base}/${path}`;
    } else {
      uri = base + path;
    }

    return uri;
  }

  return path;
}

export function getRequest(uri, options) {
  return restRequest(uri, options);
}

export function postRequest(uri, data, options) {
  return restRequest(uri, { ...{ method: 'POST', body: JSON.stringify(data) }, ...options });
}

export function putRequest(uri, data, options) {
  return restRequest(uri, { ...{ method: 'PUT', body: JSON.stringify(data) }, ...options });
}

export function deleteRequest(uri, options) {
  return restRequest(uri, { ...{ method: 'DELETE' }, ...options });
}

export const requestWatcher = new RequestWatcher();

// Return full static url
export function getStaticUrl(path) {
  if (path.startsWith('//') || path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  let base = config.staticServer;
  if (typeof base === 'string' && typeof path === 'string') {
    if (base.endsWith('/')) {
      base = base.substr(0, base.length - 1);
    }

    let uri;

    if (!path.startsWith('/')) {
      uri = `${base}/${path}`;
    } else {
      uri = base + path;
    }

    return uri;
  }

  return path;
}
