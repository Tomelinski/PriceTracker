// import {
//   loginUser, getGoogleUser, registerUser, logout,
// } from '../api/Auth';

// class AuthService {
//   static async login(username, password) {
//     try {
//       const response = await loginUser({ username, password });

//       if (response.accessToken) {
//         localStorage.setItem("user", JSON.stringify(response));
//       }

//       return response;
//     } catch (error) {
//       console.error("Error during login:", error);
//       throw error;
//     }
//   }

//   static async getGoogleUser() {
//     try {
//       const response = await getGoogleUser();
//       return response;
//     } catch (error) {
//       console.error("Error while getting Google user:", error);
//       throw error;
//     }
//   }

//   static logout() {
//     try {
//       logout();
//       localStorage.removeItem("user");
//     } catch (error) {
//       console.error("Error during logout:", error);
//       throw error;
//     }
//   }

//   static async register(username, password) {
//     try {
//       const response = await registerUser({ username, password });

//       return response;
//     } catch (error) {
//       console.error("Error during registration:", error);
//       throw error;
//     }
//   }

//   static getCurrentUser() {
//     return JSON.parse(localStorage.getItem("user") ?? null);
//   }
// }

// export default new AuthService();
