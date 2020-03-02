import pathExists from 'jrf-path-exists'

export default function toBoolean(object, path, defaultValue) {

  const value = pathExists(object, path);
  if (typeof value === "string") {
    return value.trim().toLowerCase() === 'true';
  }

  return value ? value : defaultValue;

}
