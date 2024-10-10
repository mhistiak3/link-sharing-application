import { Client, Databases } from "appwrite";
import {
  VITE_APPWRITE_LINKS_ID,
  VITE_APPWRITE_DATABASE_ID,
  VITE_APPWRITE_PROJECT_ID,
  VITE_APPWRITE_URL,
} from "../config";

export class LinksService {
  client = new Client();
  databases;

  constructor() {
    this.client
      .setEndpoint(VITE_APPWRITE_URL)
      .setProject(VITE_APPWRITE_PROJECT_ID);
    this.databases = new Databases(this.client);
  }

  async createLinks({ userId, Links }) {
    try {
      return await this.databases.createDocument(
        VITE_APPWRITE_DATABASE_ID,
        VITE_APPWRITE_LINKS_ID,
        userId,
        {
          links: Links,
          userId,
        }
      );
    } catch (error) {
      console.error("Error creating Links:", error);
      return { error: error.message };
    }
  }

  async updateLinks(userId, updatedLinks) {
    try {
      return await this.databases.updateDocument(
        VITE_APPWRITE_DATABASE_ID,
        VITE_APPWRITE_LINKS_ID,
        userId,
        {
          links: updatedLinks,
        }
      );
    } catch (error) {
      console.error("Error updating post:", error);
      return { error: error.message };
    }
  }

  async getLinks(userId) {
    

    try {
      return await this.databases.getDocument(
        VITE_APPWRITE_DATABASE_ID,
        VITE_APPWRITE_LINKS_ID,
        userId
      );
    } catch (error) {
      console.log("Error getting Links:", error.message);
      return false;
    }
  }
}
const linksService = new LinksService();
export default linksService;
