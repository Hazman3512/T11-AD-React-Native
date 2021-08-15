import axios from 'axios';

const USER_API_BASE_URL="http://localhost:5000/users"

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

    async authenticateUser(User){
        return await axios.post("http://localhost:5000/login",JSON.stringify(User),{
            headers:{
                'Content-Type':'application/json'
            }
        }).then(response=>{
            return response;
        }).catch(error=>{
            return error.response;
        })
    }
}
export default new UserService()