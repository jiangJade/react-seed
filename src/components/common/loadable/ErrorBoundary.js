import React from 'react';
import { ExclamationCircleFilled } from '@ant-design/icons';
import styles from './styles.scss';

class ErrorBoundary extends React.Component {
    state = {
        error: null,
        errorInfo: null
    };

    componentDidCatch(error, errorInfo) {
        this.setState({
            error,
            errorInfo
        });
    }

    render() {
        const { error, errorInfo } = this.state;
        const { children } = this.props;
        return errorInfo ? (
            <section className={styles.container}>
                <h2 className={styles.title}>
                    <ExclamationCircleFilled />
                    <span className={styles.error}>页面加载失败</span>
                </h2>
                <details>
                    <pre>
                        <code>{error && error.toString()}</code>
                    </pre>
                    <br />
                    <pre>
                        <code>{errorInfo.componentStack}</code>
                    </pre>
                </details>
            </section>
        ) : children;
    }
}

export default ErrorBoundary;