import { Component } from 'react';
import styles from './FallBackUIComponent.module.scss';

interface FallBackUIProps {
  errorText: string;
}

class FallBackUIComponent extends Component<FallBackUIProps> {
  constructor(props: FallBackUIProps) {
    super(props);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    return (
      <div className={styles.fallbackContainer}>
        <div className={styles.fallback}>
          <div className={styles.fallbackText}>
            <h2>Something went wrong...</h2>
            <span className={styles.fallbackError}>{this.props.errorText}</span>
            <button className={styles.reloadBtn} onClick={this.handleReload}>
              Reload App
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default FallBackUIComponent;
