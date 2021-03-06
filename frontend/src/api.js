import axios from "axios"; //import
import { authHeader } from "./auth";

const API_URL = "http://192.168.50.64:3000";

class Api {

  //GETTERS
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

  getRecipes(username){
    return axios.get(API_URL + `/recipes?username=eq.${username}`, {
      headers: authHeader()
    });
  }

  //ADD FOODS
  async addFV(item){
    try {
      await axios.post(API_URL + '/fruits_vegetables', item,
      {
        headers: authHeader(),
      })
      return ''
    }
    catch (e) {
      return 'Something went wrong. Some fields might be missing'
    }
  }

  addMeat(item){
    try {
      axios.post(API_URL + '/meats', item,
    {
      headers: authHeader(),
    })
    }
    catch (e) {
      console.log(e)
    }
  }

  addGO(item){ 
    try {
      let response = axios.post(API_URL + '/grains_other', item,
      {
        headers: authHeader(),
      })

      console.log(response)
    }
    catch (e) {
      console.log(e)
    }
  }

  //SAVE RECIPE
  async saveRecipe(item){ 
    try {
      await axios.post(API_URL + '/recipes', item,
      {
        headers: authHeader(),
      })

      // console.log(response)
    }
    catch (e) {
      console.log(e)
    }
  }

  //DELETE RECIPE
  deleteRecipe(id){
    axios.delete(API_URL + `/recipes?id=eq.${id}`, {
      headers: authHeader(),
    })
  }

  //DELETE FOODS BY PANTRY OR FRIDGE ID
  deleteAllFV(field, id){
    axios.delete(API_URL + `/fruits_vegetables?${field}=eq.${id}`, {
      headers: authHeader(),
    })
  }

  deleteAllMeats(id){
    axios.delete(API_URL + `/meats?fridgeid=eq.${id}`, {
      headers: authHeader(),
    })
  }

  deleteAllGO(id){
    axios.delete(API_URL + `/grains_other?pantryid=eq.${id}`, {
      headers: authHeader(),
    })
  }

  //DELETE FOODS BY FOOD ID
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

  //USERS
  getAllUsers(){
    return axios.get(API_URL + '/users', {
      headers: authHeader(),
    })
  }

  async editRoleUser(username, role){
    await axios.patch(API_URL + `/users?username=eq.${username}`, {
      "role": role
    }, {
      headers: authHeader(),
    })
    return;
  }


  //FUNCTIONS
  deleteUser(username){
    axios.post(API_URL + `/rpc/delete_single_user`, {
      'username': username
    }, {
      headers: authHeader(),
    })
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
