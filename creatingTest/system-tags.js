import http from 'k6/http';

export const options = {
    thresholds: {
        http_req_duration: ['p(95)<1000'],
        'http_req_duration{status:200}': ['p(95)<1000'],
        'http_req_duration{status:201}': ['p(95)<1000']
    }
}

export default function () {
    http.get('https://run.mocky.io/v3/cef9ccd3-7768-45f4-ab95-d2edd7f90db6');
    http.get('https://run.mocky.io/v3/92e5fe0a-4cf5-4f1d-9356-65410053a22e?mocky-delay=2000ms');
}