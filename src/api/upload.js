import { uploadRequest } from './utils';

export default function fileUpload(file) {
  const endPoint = '/api/images';

  const formData = new FormData();

  // for (name in file) { // eslint-disable-line
  //   formData.append(name, file[name]);
  // }

  formData.append('file', file);

  return uploadRequest(endPoint, formData);
}
