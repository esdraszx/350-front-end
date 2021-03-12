import axios from "axios";
import { authHeader, getJwtToken, getUserIdFromToken } from "./auth";

const API_URL = "http://192.168.50.64:3000";

class Api {
  getUserFridgeAndPantry(username) {
    return axios.get(API_URL + `/user_kitchen_list?username=eq.${username}`);
  }

  getFridgeFV(fridgeid){
    return axios.get(API_URL + `/fruits_vegetables?fridgeid=eq.${fridgeid}`);
  }

  getFridgeMeats(fridgeid){
    return axios.get(API_URL + `/meats?fridgeid=eq.${fridgeid}`);
  }

  getPantryFV(pantryid){
    return axios.get(API_URL + `/fruits_vegetables?pantryid=eq.${pantryid}`);
  }

  getPantryGO(pantryid){
    return axios.get(API_URL + `/grains_other?pantryid=eq.${pantryid}`);
  }

  getFVById(id){
    return axios.get(API_URL + `/fruits_vegetables?id=eq.${id}`);
  }

  getGOById(id){
    return axios.get(API_URL + `/grains_other?id=eq.${id}`);
  }

  getMById(id){
    return axios.get(API_URL + `/meats?id=eq.${id}`);
  }

  addFV(item){
    axios.post(API_URL + '/fruits_vegetables', item,
    {
      headers: authHeader(),
    })
  }

  addMeat(item){
    axios.post(API_URL + '/meats', item,
    {
      headers: authHeader(),
    })
  }

  addGO(item){
    axios.post(API_URL + '/grains_other', item,
    {
      headers: authHeader(),
    })
  }

  deleteFV(id){
    axios.delete(API_URL + `/fruits_vegetables?id=eq.${id}`, {
      headers: authHeader(),
    })
  }

  deleteMeats(id){
    axios.delete(API_URL + `/meats?id=eq.${id}`, {
      headers: authHeader(),
    })
  }

  deleteGO(id){
    axios.delete(API_URL + `/grains_other?id=eq.${id}`, {
      headers: authHeader(),
    })
  }

  addArticle(article) {
    return axios.post(
      API_URL + "/articles",
      {
        ...article,
        // add user id from JWT token
        userid: getUserIdFromToken(getJwtToken()),
      },
      {
        headers: authHeader(),
      }
    );
  }

  updateArticle(article) {
    return axios.patch(
      API_URL + `/articles?articleid=eq.${article.articleid}`,
      article,
      {
        headers: authHeader(),
      }
    );
  }

  deleteArticle(id) {
    return axios.delete(API_URL + `/articles?articleid=eq.${id}`, {
      headers: authHeader(),
    });
  }

  publishArticle(id) {
    return axios.post(
      API_URL + "/rpc/publish",
      { id: id },
      {
        headers: authHeader(),
      }
    );
  }

  login(username, password) {
    return axios.post(API_URL + "/rpc/login_admin", 
    { 
        'username': username,
        'upassword': password
    });
  }

  signup(username, password, name) {
    return axios.post(API_URL + "/rpc/signup", 
      { 
        'username': username,
        'password': password,
        'name': name,
        'role': 1 
      }
    );
  }
}

export default new Api();
