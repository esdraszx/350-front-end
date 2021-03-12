<template>
  <div id="header">
    <div id="header-container">
        <div id="logo">
            <router-link :to="`/`" v-if="isLogin === false">Landing</router-link>
            <router-link :to="`/home`" v-else>Home</router-link>
        </div>
        <div id="menu">
            <ul>
                <!-- <li v-if="isLogin"><router-link :to="`home`">Home</router-link></li> -->
                <!-- <li><router-link :to="`recipes`">Recipes</router-link></li> -->
                <li v-if="isLogin"><router-link :to="`logout`" >Logout</router-link></li>
                <li v-else><router-link :to="`login`" >Login</router-link></li>
                <li id="last" v-if="isAdmin"><router-link :to="`admin`">Admin</router-link></li>
            </ul>
        </div>
    </div>
  </div>
</template>

<script>
// import Api from "../api";
import { getRolePermissions, getJwtToken } from '../auth'

export default {
  name: "Header",
  data: function () {
    return {
        isAdmin: false,
        isLogin: false,
    };
  },
  methods:{
  },
  created: function(){
      let token = getJwtToken()
      if(!token){
        this.isLogin = false
        return;
      }
      else {
        this.isLogin = true
      }
      
      let rights = getRolePermissions(token)

      if(rights === 'admins'){
        this.isAdmin = true
      }
      else {
        this.isAdmin = false
      }
  },
};
</script>

<style scoped>

#header {
    background-color:rgb(226, 226, 226);
    width: 100%;
    height: 75px;
    position: fixed;
    top: 0px;
    right: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
}

#header-container {
    position: relative;
    width: 60%;
    height: 100%;
    display: flex;
    align-items: center;
}

#logo {
    position: absolute;
    left: 1%;
}

#menu {
    height: 100%;
    position: absolute;
    right: 1%;
}

#menu ul {
    height: 100%;
    display: flex;
    align-items: center;
}

#menu ul li {
    margin: 0px 10px 0px 10px;
    list-style: none;
}

a {
    font-size: 17px !important;
}

#last {
    margin-right: 0px !important;
}


</style>