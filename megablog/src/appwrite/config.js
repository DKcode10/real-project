import conf from "../conf/conf.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  Client = new Client();
  databases;
  bucket;

  constructor() {
    this.Client.setEndpoint(conf.appwriteUrl).setProject(
      conf.appwriteProjectId
    );

    this.databases = new Databases(this.Client);
    this.bucket = new Storage(this.Client);
  }
  async createPost(title, slug, content, featuredImage, status, userId) {
    try {
      return await this.databases.createDocument(
        conf.appwriteProjectId,
        conf.appwriteCollectiontId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("Appwrite serive :: createPost :: error", error);
    }
  }

  async updatePost(slug, { title, slug, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectiontId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      throw error;
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectiontId,
        slug
      );
      return true;
    } catch (error) {
      throw error;
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectiontId,
        slug
      );
    } catch (error) {
      throw error;
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectiontId,
        queries
      );
    } catch (error) {
      throw error;
      return false
    }
  }

  //file upload service

  async uploadFile (file){
    try {
       return await this.bucket.createPost(
            conf.appwriteBuckedtId,
            ID.unique(),
            file
           
        )
    } catch (error) {
        throw error
        return false
    }
  }

  async deleteFile(fileId){
    try {
        return await this.bucket.deleteFile(
            conf.appwriteBuckedtId,
            fileId
        )
        return true
    } catch (error) {
        throw error
        return false
    }
  }
  
  getFilePreview(fileId){
    return this.bucket.getFilePreview(
        conf.appwriteBuckedtId,
        fileId
    )
  }
}
 
const service = new Service();

export default service;
