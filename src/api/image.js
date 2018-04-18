import { getStaticUrl } from './utils';

function imageSuffix(option) {
  const suffix = `.${option.name}.${option.extension}`;

  return suffix;
}

export function getImageDescription(image) {
  return image.metadata.description;
}

export function getImageUrl(image, optionName) {
  if (typeof optionName !== 'string') {
    optionName = 'thumbnail';
  }

  const option = image.options[optionName];
  const suffix = imageSuffix(option);
  const url = image.url + suffix;
  return getStaticUrl(url);
}
