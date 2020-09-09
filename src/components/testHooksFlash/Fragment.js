import React, { useState, useCallback } from 'react';
// import { Button } from 'antd';
import SoonComponent from './SoonComponet';

// useCallback 就是返回一个函数，只有在依赖项发生变化的时候才会更新（返回一个新的函数）

// useMemo，缓存对象，达到useCallback的效果

// 如果每次hook组件更新，那么hook就会导出一个新的count,const 就会声明一个新的obj对象，
// 即使用了memo包裹，也会被认为是一个新的对象。

export default function App() {
    const [count1, setCount1] = useState(0);
    const [count2, setCount2] = useState(0);

    const handleClickButton1 = () => {
        setCount1(count1 + 1);
    };

    // const handleClickButton2 = () => {
    //     setCount2(count2 + 1);
    // };
    const handleClickButton2 = useCallback(() => {
        setCount2(count2 + 1);
    }, []);

    return (
        <div>
            <div>
                <SoonComponent onClickButton={handleClickButton1}>Button1</SoonComponent>
                {/* <div>{count1}</div> */}
            </div>
            <div>
                <SoonComponent onClickButton={handleClickButton2}>Button2</SoonComponent>
            </div>
            {/* <SoonComponent onClickButton /> */}
        </div>
    );
}

// export default class App extends React.PureComponent {
//     state = {
//         count: 1
//     };
//     // onClick = () => {
//     //     const { count } = this.state;
//     //     this.setState({
//     //         count: count + 1
//     //     });
//     // };
//     render() {
//         const { count } = this.state;
//         console.log('father render');
//         return (
//             <div>
//                 <SoonComponent count={count} />
//                 <Button onClick={() => {
//                     setValue(value + 1)
//                 }}>测试</Button>
//             </div>
//         );
//     }

// }
// export default function Father() {
//     const [count, setCount] = useState(1);
//     const [value, setValue] = useState(1);
//     console.log('father render');
//     return (
//         <div>
//             <SoonComponent count={count} />
//             <div>value{value}</div>
//             <Button
//                 onClick={() => {
//                     setValue(value + 1);
//                 }}
//             >
//                 测试
//             </Button>
//         </div>
//     );
// }