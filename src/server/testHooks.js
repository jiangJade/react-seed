import { HttpMethod, API} from '../constants/enum';
import HiggsPromise from '../utils/higgsPromise';

// 事件列表
export function getTrafficEvent(data) {
    const { current, size, sdId } = data.data;
    return HiggsPromise({
        url: `/traffic/trafficEvent/page?current=${current}&size=${size}&sdId=${sdId}`,
        type: HttpMethod.POST,
        data: data.searchParams
    })
}