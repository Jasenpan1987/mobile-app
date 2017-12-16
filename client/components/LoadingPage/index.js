import React, { Component } from 'react';
import { Line } from 'rc-progress';
import styles from './style.scss';
import { Image } from '../UI/Image';
// import { BackgroundImageStyle } from '../UI/StyleComponents';
import classnames from 'classnames';

class LoadingPageComponent extends Component {
  state = {
    percentage: 0
  }

  interval = null

  componentDidMount() {
    this.increasePercentage();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  increasePercentage = () => {
    this.interval = setInterval(() => {
      this.setState({
        percentage: ++this.state.percentage
      });
      if (this.state.percentage >= 100) {
        clearInterval(this.interval);
      }
    }, 15);
  }

  getLoadingByBrand = () => {

  }

  render() {
    return (
      <div className={classnames(styles.splash, 'theme-background-image')}>

        <div className={styles.logo}>
          <div>
            <Image src="logo-login.png" />
            <div className={styles.progressWrapper}>
              <Line strokeWidth="1" percent={this.state.percentage} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export const LoadingPage = LoadingPageComponent;
