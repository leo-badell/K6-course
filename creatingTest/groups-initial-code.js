import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
    thresholds: {
        http_req_duration: ['p(95)<250']
    }
}

export default function () {
    let res = http.get('https://test.k6.io/');
    check(res, { 'status is 200': (r) => r.status === 200 });

    sleep(1);
}
