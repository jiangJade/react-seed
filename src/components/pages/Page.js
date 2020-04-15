import React, { Component } from 'react';
import styles from  './index.scss';
import CaptureValue from './CaptureValue';
import Fragment from './Fragment';

export default class Page extends Component {
    render() {
        return (
            <div className={styles.about}>
                <p className={styles.title}>首页6666666666666</p>
                <CaptureValue />
                <table>
                    <tr>
                        <Fragment />
                    </tr>
                </table>
            </div>
        );
    }
}