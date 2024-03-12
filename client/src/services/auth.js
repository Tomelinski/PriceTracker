import { loginUser, getGoogleUser, registerUser, logout } from '../api/Auth';

class AuthService {
  async login(username, password) {
    const response = await loginUser({ username, password });

    console.log('Normal logged in');
    if (response.accessToken) {
      localStorage.setItem("user", JSON.stringify(response));
    }

    return response;
  }

  async getGoogleUser() {
    const response = await getGoogleUser();
    console.log('google logged in');
    return response;
  }

  logout() {
    logout();
    localStorage.removeItem("user");
  }

  async register(username, password) {
    const response = await registerUser({ username, password });

    if (response.sucess) {
        console.log("user registered");
    } else {
        console.log("an error has occured");
    }
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();