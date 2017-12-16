import styles from './global.scss';

export const CLS_FORM_CONTROL_HIGHLIGHT = `${styles['form-control']} ${styles['form-control-highlight']}`;

export const CLS_BUTTON_WARNING = `${styles.btn} theme-btn-warning`;
export const CLS_BUTTON_SUCCESS = `${styles.btn} theme-btn-success`;

export const CLS_FORM_BUTTON_WARNING_HIGHTLIGHT_FILL = `${CLS_FORM_CONTROL_HIGHLIGHT} ${CLS_BUTTON_WARNING} ${styles['btn-fill']}`;
