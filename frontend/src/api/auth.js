import axios from 'axios';

var api = "http://127.0.0.1:8000/api/auth";

const auth = {
  authenticate: user => new Promise(function (resolve, reject) {
    var config = {
      headers: {  'Content-type': 'application/json; charset=utf-8',
                  'Accept': 'application/json; charset=utf-8',
                  'Access-Control-Allow-Origin': "*",
                  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept' }
    };

    axios.post(api + '/login', user, config).then((response) => {
        console.log('1');
        if(response.status == 401) {
          reject();
        }
        else {
          var token = 'Bearer '+ response.data.access_token;
          config.headers.Authorization = token;
          console.log(config.headers);
          axios.get(api + '/user', config).then((response) => {    
            resolve({
                id_token: token,
                user: response.data
            });
          });
        }
    }).catch((error) => {
        console.log(error);  
        reject(error);
    });
  })
};

export default auth;
