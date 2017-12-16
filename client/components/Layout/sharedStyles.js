import styles from '../../shared/styles/global.scss';
import classnames from 'classnames';

export const mainLayoutContainer = classnames(styles.row, 'theme-background-color-lighter', 'theme-color-lightest');
export const subLayoutContainer = classnames(styles.row, styles['layout-sub'], 'theme-background-color-lightest', 'theme-color-lightest');
export const menuItemLink = classnames(styles.btn, 'theme-color-lightest');
export const menuItemDefault = classnames(styles['layout-sub-item-default']);
export const menuItemActive = classnames(styles['layout-sub-item-active'], 'theme-shadow-outstanding');
