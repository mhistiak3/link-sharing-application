import { Client, ID, Databases, Storage } from "appwrite";
import {
  VITE_APPWRITE_PROFILE_ID,
  VITE_APPWRITE_STORAGE_ID,
  VITE_APPWRITE_DATABASE_ID,
  VITE_APPWRITE_PROJECT_ID,
  VITE_APPWRITE_URL,
} from "../config";

export class ProfileService {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(VITE_APPWRITE_URL)
      .setProject(VITE_APPWRITE_PROJECT_ID);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createProfile({ firstName, lastName, email, userId, profileImage }) {
    try {
      return await this.databases.createDocument(
        VITE_APPWRITE_DATABASE_ID,
        VITE_APPWRITE_PROFILE_ID,
        userId,
        {
          firstName,
          lastName,
          email,
          userId,
          profileImage,
        }
      );
    } catch (error) {
      console.error("Error creating profile:", error);
      return { error: error.message };
    }
  }

  async updateProfile(userId, updateProfile) {
    try {
      console.log(updateProfile);

      return await this.databases.updateDocument(
        VITE_APPWRITE_DATABASE_ID,
        VITE_APPWRITE_PROFILE_ID,
        userId,
        updateProfile
      );
    } catch (error) {
      console.error("Error updating post:", error);
      throw error;
    }
  }

  async getProfile(userId) {
    try {
      return await this.databases.getDocument(
        VITE_APPWRITE_DATABASE_ID,
        VITE_APPWRITE_PROFILE_ID,
        userId
      );
    } catch (error) {
      console.error("Error getting prifile:", error.message);
      return false;
    }
  }

  //   Upload file
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        VITE_APPWRITE_STORAGE_ID,
        ID.unique(),
        file
      );
    } catch (error) {
      console.error("Error uploading file:", error);
      return false;
    }
  }
  async deleteFile(fileId) {
    
    try {
      await this.bucket.deleteFile(VITE_APPWRITE_STORAGE_ID, fileId);
      return true;
    } catch (error) {
      console.error("Error deleting file:", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFilePreview(VITE_APPWRITE_STORAGE_ID, fileId);
  }
}
const profileService = new ProfileService();
export default profileService;
