import React from 'react';
import CombinationTable from '@/components/common/customHooksTable/combinationTable/CombinationTable';
import styles from  './index.scss';

export default function Page() {
    // const data = [
    //     {
    //         Asend: 0,
    //         Ksend: 0,
    //         Msend: 0,
    //         Isend: 0,
    //         Csend: 0,
    //         Esend: 0,
    //         Lsend: 0,
    //         Gsend: 0,
    //         Nsend: 0,
    //         Dsend: 0,
    //         Jsend: 0,
    //         Bsend: 0,
    //         Fsend: 0
    //     },
    //     {
    //         Asend: 0,
    //         Ksend: 0,
    //         Msend: 0,
    //         Isend: 0,
    //         Csend: 0,
    //         Esend: 0,
    //         Lsend: 0,
    //         Gsend: 0,
    //         Nsend: 0,
    //         Dsend: 0,
    //         Jsend: 0,
    //         Bsend: 0,
    //         Fsend: 0
    //     },
    //     {
    //         Asend: 0,
    //         Ksend: 0,
    //         Msend: 0,
    //         Isend: 0,
    //         Csend: 0,
    //         Esend: 0,
    //         Lsend: 0,
    //         Gsend: 0,
    //         Nsend: 0,
    //         Dsend: 0,
    //         Jsend: 0,
    //         Bsend: 0,
    //         Fsend: 0
    //     },
    //     {
    //         Asend: 0,
    //         Ksend: 0,
    //         Msend: 0,
    //         Isend: 0,
    //         Csend: 0,
    //         Esend: 0,
    //         Lsend: 0,
    //         Gsend: 0,
    //         Nsend: 0,
    //         Dsend: 0,
    //         Jsend: 0,
    //         Bsend: 0,
    //         Fsend: 0
    //     }
    // ];

    const getColumns = [
        {
            title: '序号',
            dataIndex: 'Asend'
        }, {
            title: '报警时间',
            dataIndex: 'Ksend'
        }, {
            title: '报警类型',
            dataIndex: 'Msend'
        }, {
            title: '报警位置',
            dataIndex: 'Isend'
        }
    ];

    return (
        <div className={styles.about}>
            <p className={styles.title}>首页6666666666666</p>
            <CombinationTable
                getColumns={getColumns}
            />
            <div className="about">88888888888888888888</div>
        </div>
    );
}