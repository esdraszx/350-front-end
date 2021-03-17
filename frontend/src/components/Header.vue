<template>
  <div id="header">
    <div id="header-container">
        <div id="logo">
            <router-link v-if="isLogin === false" id="logo-container" :to="`/landing`"><img id="logo-img" width="72" src="../assets/icon.png"/></router-link>
            <router-link v-else id="logo-container" :to="`/home`"><img id="logo-img" width="72" src="../assets/icon.png"/></router-link>
        </div>
        <div id="brand">
          <!-- <h1>Kitchen Tracker</h1> -->
          <img src="../assets/logo_name.png" height="90"/>
        </div>
        <div id="menu">
            <ul>
                <!-- <li v-if="isLogin"><router-link :to="`home`">Home</router-link></li> -->
                <!-- <li><router-link :to="`recipes`">Recipes</router-link></li> -->
                <li v-if="isLogin"><router-link :to="`logout`" >Logout</router-link></li>
                <li v-else><router-link :to="`login`" >Login</router-link></li>
                <li v-if="!isLogin"><router-link :to="`register`" >Register</router-link></li>
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
    goHome(cPath){
      this.$router.push({ path: cPath })
    },
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
    background-color:var(--lightP);
    width: 100%;
    height: 100px;
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
    width: 50px;
}

#menu {
    height: 100%;
    position: absolute;
    right: 1%;
    display: flex;
    align-items: center;
}

#menu ul {
    display: flex;
    align-items: center;
    margin: 50px 0px 0px 0px;
}

#menu ul li {
    margin: 0px 10px 0px 10px;
    list-style: none;
}

a {
  font-weight: bold;
  font-size: 17px !important;
  color: var(--darkP) !important;
}

a:hover {
  text-decoration: none;
  text-shadow: 0px 0px 2px var(--shadeP);
}

#last {
    margin-right: 0px !important;
}

#brand {
  position: absolute;
  width: 100%;
  text-align: center;
  pointer-events: none;
}

#logo-container {
  /* border: 1px solid red; */
  position: relative;
  height: 100px;
  width: 100%;
  top: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
}

#logo-img {
  position: fixed;
  border: 0px solid black;
  top: calc(0 - 200px);
}

@media only screen and (max-width: 1000px) {
  #brand {
    display: none;
  }

  #menu ul {
    flex-direction: column;
    margin-top: 0px;
    height: auto;
  }

  #menu ul li {
    margin: 0px !important;
    margin-top: 5px !important;
  }
}
</style>