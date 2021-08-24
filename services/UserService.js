import axios from "axios";
import "./global";
//use IPv4 address instead of localhost

const USER_API_BASE_URL = global.IP + "users";
const USER_API_LOGIN_URL = global.IP + "login";

class UserService {
  async addUser(User) {
    return await axios
      .post(USER_API_BASE_URL + "/add", JSON.stringify(User), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  authenticateUser(User) {
    return axios.post(USER_API_LOGIN_URL, JSON.stringify(User), {
      headers: {
        "Content-Type": "application/json",
      },
    });
    // .then(response=>{
    //     return response;
    // }).catch(error=>{
    //     return error.response;
    // })
  }
}
export default new UserService();
