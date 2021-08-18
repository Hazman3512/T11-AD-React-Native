import axios from 'axios';
//use IPv4 address instead of localhost

const USER_API_BASE_URL="http://192.168.1.78:5000/users"

class UserService{
    async addUser(User){
        return await axios.post(USER_API_BASE_URL+"/add",JSON.stringify(User),{
            headers:{
                'Content-Type':'application/json'
            }
        }).then(response=>{
            return response;
        }).catch(error=>{
            return error.response;
        });       
      }

    authenticateUser(User){
        return axios.post("http://192.168.1.78:5000/login",JSON.stringify(User),{
            headers:{
                'Content-Type':'application/json'
            }
        });
        // .then(response=>{
        //     return response;
        // }).catch(error=>{
        //     return error.response;
        // })
    }
}
export default new UserService();