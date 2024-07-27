import http from 'k6/http';

//Using on the command: k6 run --http-debug="full" http-get.js
export default function () {
    const res = http.get('https://test-api.k6.io/public/crocodiles/1');
    // console.log(res);
}