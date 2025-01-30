const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-31',
    headers: {
        authorization: 'f55e3ada-4bc5-4af4-8283-fa0872b066a7',
        'Content-Type': 'application/json'
    }
}

export const getUserInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'GET',
        headers: config.headers
    })
        .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
};

export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'GET',
        headers: config.headers
    })
        .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
};

export const editProfile = (name, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({name, about})
    })
        .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
};

export const addCard = (name, link) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({name, link})
    })
        .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
};


// export const getInitialCards = () => {
//     return fetch(`${config.baseUrl}/cards`, {
//         headers: config.headers
//     })
//         .then(res => {
//             if (res.ok) {
//                 return res.json();
//             }
//
//             // если ошибка, отклоняем промис
//             return Promise.reject(`Ошибка: ${res.status}`);
//         });
// }