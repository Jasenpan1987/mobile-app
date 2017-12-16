const MODES = { edit: 'edit', view: 'view' };

export function isEditMode(mode) {
  return mode === MODES.edit;
}
