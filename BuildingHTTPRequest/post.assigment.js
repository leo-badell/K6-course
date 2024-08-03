import http from 'k6/http';
import { check } from 'k6';

export default function () {

    const credentials = {
        username: 'test_' + Date.now(),
        password: 'secret_' + Date.now(),
    }

    http.post(
        'https://test-api.k6.io/user/register/',
        JSON.stringify(credentials),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

    let res = http.post(
        'https://test-api.k6.io/auth/token/login/',
        JSON.stringify(
            {
                username: credentials.username,
                password: credentials.password
            }
        ),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );


    const accessToken = res.json().access;
    console.log(accessToken);

    res = http.get(
        'https://test-api.k6.io/my/crocodiles/',
        {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        }
    );


    res = http.post(
        'https://test-api.k6.io/my/crocodiles/',
        JSON.stringify(
            {
                name: 'Fulano el cocodrilo',
                sex: 'M',
                date_of_birth: '2000-10-10'
            }
        ),
        {
            headers: {
                Authorization: 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            }
        }
    );    

    const crocodrileId = res.json().id;

   res = http.get(`https://test-api.k6.io/my/crocodiles/${crocodrileId}/`,
        {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        }
    ) 
    
    check(res, {
        'status is 200': (r) => r.status === 200,
        'crocodrileId': (r) => r.json().id === crocodrileId
    })

    res = http.put(
        `https://test-api.k6.io/my/crocodiles/${crocodrileId}/`,
        JSON.stringify(
            {
                name: 'Fulanito el cocodrilo',
                sex: 'M',
                date_of_birth: '2000-10-10'
            }
        ),
        {
            headers: {
                Authorization: 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            }
        }
    );

    res = http.patch(
        `https://test-api.k6.io/my/crocodiles/${crocodrileId}/`,
        JSON.stringify(
            {
                sex: 'F'
            }
        ),
        {
            headers: {
                Authorization: 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            }
        }
    );

    res = http.del(`https://test-api.k6.io/my/crocodiles/${crocodrileId}/`,
        null,
         {
             headers: {
                 Authorization: 'Bearer ' + accessToken
             }
         }
     ) 
}
    
