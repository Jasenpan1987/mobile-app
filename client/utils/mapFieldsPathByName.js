export function mapFieldsPathByName(prefix, propertyNames) {
  return propertyNames.map(propertyName => `${prefix}.${propertyName}`);
}
