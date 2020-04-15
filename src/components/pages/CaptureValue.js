import React, { useState, useCallback, useRef } from 'react';
import { debounce } from '@/utils/debounce';

export default function CaptureValue() {
    const [count, setCount] = useState(0);
    const countRef = useRef(null);

    const handleAlertClick = () => {

        alert('You clicked on: ', count);
    };

    const onClickAdd = () => {
        setCount(count + 1);
    };
    // const handleAlertClick = useCallback(()=> {

    //     alert('You clicked on: ', count);
    // }, [count]);

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick= {() => setCount(count + 1)
                // countRef.current = count + 1;
            }>
            {/* <button onClick={() => {
                // countRef.current = count + 1;
                setCount(count + 1);
            }}> */}
                增加 count
            </button>
            <button onClick={handleAlertClick}>
                显示 count
            </button>
        </div>
    );
}