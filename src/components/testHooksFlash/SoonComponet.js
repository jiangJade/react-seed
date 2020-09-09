// import React, {memo} from 'react';

// function App(props) {
// // export default function App(props) {
//     console.log(props, 'props');
//     return <div>{props.count}</div>;
// }

// export default memo(App);

import React from 'react';
const Button = (props) => {
    const { onClickButton, children } = props;
    return (
        <>
            <button onClick={onClickButton}>{children}</button>
            <span>{Math.random()}</span>
        </>
    );
};
export default Button;