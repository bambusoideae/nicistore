const shajs = require('sha.js');

import { restRequest, postRequest, getRequest, putRequest, uploadRequest } from './utils';


// Return list of published products
export function getProducts() {
  return restRequest('/api/products');
}

export function getProductById(id) {
  return restRequest(`/api/products/${id}`);
}

// For admin only
export function getAllProducts() {
  return getRequest('/api/products/all');
}

export function fetchProductBaseById(productId) {
  return getRequest(`/api/products/${productId}/base`);
}

export function fetchLatestProductVersion(productId) {
  return getRequest(`/api/products/${productId}/revision/latest`);
}

export function fetchProductByVersionId(productId, revisionId) {
  return getRequest(`/api/products/${productId}/revision/${revisionId}`);
}

export function createProduct(product) {
  return postRequest('/api/products', product);
}

export function updateProduct(productId, product) {
  return putRequest(`/api/products/${productId}`, product);
}

export function updateProductVersion(productId, revisionId, product) {
  return putRequest(`/api/products/${productId}/revision/${revisionId}`, product);
}

export function publishProduct(productId, revisionId) {
  return postRequest(`/api/products/${productId}/publish/${revisionId}`);
}

export function uploadProductImage(productId, file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    // console.log(i);
    // console.log(file);

    reader.onload = (event) => {
      // console.log(i);
      // console.log(file);
      const buffer = event.target.result;
      // function buf2hex(buffer) { // buffer is an ArrayBuffer
      //   return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
      // }
      // console.log(buf2hex(buffer));

      const binary = new Uint8Array(buffer);
      // set the url to wherever you meteor app is running
      const sha256 = shajs('sha256').update(binary).digest('hex');

      console.log(`Image sha256: ${sha256}`);

      return resolve(uploadRequest(`/api/products/${productId}/images`, file));
    };

    reader.readAsArrayBuffer(file);
  });
}
