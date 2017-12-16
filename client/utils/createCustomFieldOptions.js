
const defaultOption = { key: 'please select', value: '', name: 'please select' };

export function createCustomFieldOptions(optStr, withDefault = false) {
  const optionsFromStr = optStr.split(';')
    .map(opt => opt.trim())
    .filter(opt => opt !== '')
    .map((opt, idx) => ({ key: idx, value: opt, name: opt }));

  return (withDefault ? [defaultOption, ...optionsFromStr] : optionsFromStr);
}
