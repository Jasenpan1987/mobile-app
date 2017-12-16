import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadDashboardAct, closeDashboardLoadErrorModalAct } from './actions';
import { LoadingLayer } from '../UI/LoadingLayer';
import PropTypes from 'prop-types';

import styles from './Dashboard.scss';
import ChartGroup from './ChartGroup';
import Summary from './Summary';
import { DashboardErrorModal } from './DashboardModal';
// import { BackgroundImageStyle } from '../UI/StyleComponents';
import { formatCurrency } from '../../utils/formatCurrency';
import classnames from 'classnames';

class DashboardComponent extends Component {

  componentDidMount() {
    const { params: { projectId } } = this.props;

    this.props.loadDashboard(projectId);
    // this.props.loadCurrentProject(projectId);
  }

  // persentage cannot divide by 0, so 0 || 1 gives persentage of 0, because the divider is 0
  getSummaryLines = (dashboardData) => {
    return [{
      text: `${dashboardData.numberOfExchanged}/${dashboardData.numberOfLot}`,
      hint: 'lots exchanged',
      persent: dashboardData.numberOfExchanged / (dashboardData.numberOfLot || 1) * 100
    }, {
      text: `${formatCurrency(dashboardData.totalDeposit, 0)}`,
      hint: 'deposits taken',
      persent: dashboardData.totalDeposit / (dashboardData.totalPurchasePrice || 1) * 100
    }, {
      text: `${dashboardData.numberOfForeignInvestors}/${dashboardData.numberOfExchanged + dashboardData.numberOfForeignInvestors}`,
      hint: 'lots sold to foreign investors',
      persent: dashboardData.numberOfForeignInvestors / ((dashboardData.numberOfExchanged + dashboardData.numberOfForeignInvestors) || 1) * 100
    }];
  }

  getSalesChartGroup = (dashboardData) => {
    return {
      name: 'Sales Data',
      charts: [
        {
          name: 'STATUS BREAKDOWN',
          dataset: [
            { name: 'For sale', value: dashboardData.numberOfForSale, color: '#4FA6EB' },
            { name: 'Contract issued', value: dashboardData.numberOfContractIssued, color: '#EAC341' },
            { name: 'Exchange partial', value: dashboardData.numberOfExchangePartial, color: '#E89435' },
            { name: 'Exchanged', value: dashboardData.numberOfExchanged, color: '#B871D4' },
            { name: 'Settled', value: dashboardData.numberOfSettled, color: '#6CBC3F' },
            { name: 'Other', value: dashboardData.numberOfOthers, color: '#EA4D3D' }
          ],
          total: { name: 'Total number of lots', value: dashboardData.numberOfLot }
        },
        {
          name: 'KEY FINANCIALS',
          dataset: [
            { name: 'Total purchase price', value: dashboardData.totalPurchasePrice, color: '#4FA6EB', isCurrency: true },
            { name: 'Total deposit', value: dashboardData.totalDeposit, color: '#6CBC3F', isCurrency: true }
          ]
        }
      ]
    };
  }

  getForeignInvestmentChartGroup = (dashboardData) => {
    return {
      name: 'Foreign Investment Data',
      charts: [
        {
          name: 'NUMBER OF FOREIGN INVESTORS',
          dataset: [
            { name: 'Non-Foreign Investor', value: 75, color: '#4FA6EB' },
            { name: 'Foreign Investor', value: 25, color: '#6CBC3F' }
          ],
          total: { name: 'Total Purchasers', value: dashboardData.totalPurchasePrice }
        },
        {
          name: 'LOTS SOLD TO FOREIGN INVESTORS',
          dataset: [
            { name: 'Non-Foreign Investor', value: 125, color: '#4FA6EB' },
            { name: 'Foreign Investor', value: 125, color: '#6CBC3F' }
          ],
          total: { name: 'Total Purchasers', value: 250 }
        },
        {
          name: 'FIRB APPROVAL',
          dataset: [
            { name: 'Yes', value: 50, color: '#4FA6EB' },
            { name: 'No', value: 25, color: '#6CBC3F' }
          ],
          total: { name: 'Total Purchasers', value: 75 }
        }
      ]
    };
  }

  render() {
    const { dashboardData, currentProject: { name }, closeDashboardLoadErrorModal } = this.props;
    const summaryData = { projectName: name, progressLines: this.getSummaryLines(dashboardData) };
    const salesChartGroup = this.getSalesChartGroup(dashboardData);
    // const foreignInvestmentChartGroup = this.getForeignInvestmentChartGroup(dashboardData);

    return (
      <div className={styles.container}>
        {dashboardData.isLoading && <LoadingLayer />}

        <div className={classnames(styles.containerHeader, 'theme-background-image', 'theme-color-invert')}>
          <Summary {...summaryData} />
        </div>
        <div className={classnames(styles.containerChart, 'theme-background-color-buffer-two')} >
          <ChartGroup {...salesChartGroup} />
          {/* <ChartGroup {...foreignInvestmentChartGroup} /> */}
        </div>
        <DashboardErrorModal
          isOpen={dashboardData.isDashboardErrorModalOpen}
          closeModal={closeDashboardLoadErrorModal}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentProject: state.currentProject,
    dashboardData: state.dashboardData
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadDashboard: (currentProjectId) => dispatch(loadDashboardAct(currentProjectId)),
    // loadCurrentProject: (currentProjectId) => dispatch(loadProjectAct(currentProjectId)),
    closeDashboardLoadErrorModal: () => dispatch(closeDashboardLoadErrorModalAct())
  };
}

DashboardComponent.propTypes = {
  currentProject: PropTypes.object.isRequired,
  dashboardData: PropTypes.object.isRequired,
  loadDashboard: PropTypes.func.isRequired,
  // loadCurrentProject: PropTypes.func,
  closeDashboardLoadErrorModal: PropTypes.func,
  params: PropTypes.object.isRequired
};

export const DashBoard = connect(mapStateToProps, mapDispatchToProps)(DashboardComponent);
