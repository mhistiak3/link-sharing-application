import { Account, Client, ID } from "appwrite";
import { VITE_APPWRITE_PROJECT_ID, VITE_APPWRITE_URL } from "../config";

export class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(VITE_APPWRITE_URL)
      .setProject(VITE_APPWRITE_PROJECT_ID);

    this.account = new Account(this.client);
  }

  // * create account
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        return await this.login({ email, password });
      } else {
        throw new Error("Account creation failed");
      }
    } catch (error) {
      console.error("Error creating account:", error.message);
      return { error : error.message };
    }
  }
  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.error("Error logging in:", error.message);
      return { error: error.message };
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Error getting current user:", error.message);
    }
    return null;
  }

  async logout() {
    try {
      await this.account.deleteSession("current");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }
}

const authService = new AuthService();
export default authService;
