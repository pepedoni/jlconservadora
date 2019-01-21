import request from './request';

const auth = {
  authenticate: user => new Promise(function(resolve, reject) {
    request.post('/api/auth/login', user).then((response) => {
      if (response.status == 401) {
        reject();
      } else {
        let token = response.data.access_token;
        localStorage.setItem('@jl_token', token);
        request.get('/api/auth/user').then((response) => {
          resolve({
            jl_token: token,
            user: response.data
          });
        }).catch((error) => {
          reject(error);
        });
      }
    }).catch((error) => {
      reject(error);
    });
  }),

  logout: () => new Promise(function(resolve, reject) {
    request.get('api/auth/logout').then((response) => {
      resolve();
    }).catch((error) => {
        reject(error);
    });
  })
};

export const TOKEN_KEY = '@jl_token';

export const getToken = () => localStorage.getItem('@jl_token');

export default auth;