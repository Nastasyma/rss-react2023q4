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
          <h2>{this.props.errorText}</h2>
          <button className={styles.reloadBtn} onClick={this.handleReload}>
            Reload App
          </button>
        </div>
      </div>
    );
  }
}

export default FallBackUIComponent;
