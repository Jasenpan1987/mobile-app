import classnames from 'classnames';
import localStyles from './LotDetailSection.scss';
import globalStyles from '../../../shared/styles/global.scss';

export const innerSectoinSmallCls = classnames(globalStyles['col-sm-2'], globalStyles['col-xs-12'], localStyles['inner-section']);
export const innerSectoinMediumCls = classnames(globalStyles['col-sm-3'], globalStyles['col-xs-12'], localStyles['inner-section']);
export const innerSectoinLargeCls = classnames(globalStyles['col-sm-6'], globalStyles['col-xs-12'], localStyles['inner-section']);
export const innerSectoinFullRowCls = classnames(globalStyles['col-sm-12'], globalStyles['col-xs-12'], localStyles['inner-section']);
export const sectionLargeCls = classnames(globalStyles['col-sm-6'], globalStyles['col-xs-12']);
export const sectionCls = classnames(globalStyles.row, localStyles.section);
