import { useState, useEffect } from 'react';
import { paramFilter, addDataIndex } from '../../../utils/util';
export const getTableData = (url, dependencies) => {
    debugger
    const [isLoading, setIsLoading] = useState(false);
    const [tableData, setTableData] = useState(null);
    const [total, setTotal] = useState(null);
  	const [error, setError] = useState(null);
  	
  	useEffect(() => {
        setIsLoading(true);
        // 调接口获取数据
        const getData = async () => {
            try { 
                const response = await (url && url());
                if (response && response.code === 0) {
                    debugger
                    const {data} = response;
                    setTableData(addDataIndex(data.records || [], 1, 10));
                    setTotal(data.total || 0);
                }
            }catch(error) {
                setIsLoading(false);
                setError(err);
            }
        };
        getData();
    }, [url, dependencies]);
    
  	return [tableData, total, isLoading, error];
};