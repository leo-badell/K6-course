import http from 'k6/http';
import { randomString } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { check } from 'k6';
import { SharedArray } from 'k6/data';

const usersCredentials = new SharedArray('new users', function() {
    return JSON.parse(open('./users.json')).users;
});

    console.log(usersCredentials)

export default function () {

    const credentials = {
        username: 'test_' + randomString(8),
        password: 'secret_' + randomString(8),
    }
    
    
    let res = http.post(
        'https://test-api.k6.io/user/register/',
        JSON.stringify(credentials),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

    check(res, {
        'status is 201': (r) => r.status === 201,
    });
}