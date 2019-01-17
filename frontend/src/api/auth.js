import axios from 'axios';

const auth = {
  authenticate: user => new Promise(function (resolve, reject) {
    var config = {
      headers: {  'Content-type': 'application/json; charset=utf-8',
                  'Accept': 'application/json; charset=utf-8' }
    };
    
    axios.post('http://127.0.0.1:8080/login', user, config).then((response) => {
        if(response.status == 203) {
          reject();
        }
        else {
          resolve(
            {
              user: {
                name: 'Pedro'
              }
            }
          );
        }
    }).catch((error) => {
        console.log(error);  
        reject(error);
    });
  })
};

export default auth;
