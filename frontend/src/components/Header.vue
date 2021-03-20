<template>
  <div id="header">
    <div id="header-container">
        <div id="logo">
            <router-link v-if="isLogin === false" id="logo-container" :to="`/landing`"><img id="logo-img" width="72" src="../assets/icon.png"/></router-link>
            <router-link v-else id="logo-container" :to="`/home`"><img id="logo-img" width="60" src="../assets/icon.png"/></router-link>
        </div>
        <div id="brand">
          <!-- <h1>Kitchen Tracker</h1> -->
          <img src="../assets/logo_name.png" height="90"/>
        </div>
        <div id="menu">
            <ul>
                <li :class="url.includes('home') ? ('active') : ('')" v-if="isLogin"><router-link :to="`/home`">Tracker</router-link></li>
                <li :class="url.includes('recipes') ? ('active') : ('')" v-if="isLogin"><router-link :to="`/recipes/[]`">Recipes</router-link></li>
                <li :class="url.includes('admin') ? ('active') : ('')" v-if="isAdmin"><router-link :to="`/admin`">Admin</router-link></li>
                <li id="last" v-if="isLogin"><router-link :to="`/logout`" >Logout</router-link></li>
                <li v-else :class="url.includes('login') ? ('active') : ('')" ><router-link :to="`login`" >Login</router-link></li>
                <li id="last" v-if="!isLogin" :class="url.includes('register') ? ('active') : ('')" ><router-link :to="`register`" >Register</router-link></li>
            </ul>
        </div>
    </div>
    <div id="color-bar"></div>
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
        url: window.location.href,
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
    z-index: 20;
}

#color-bar {
  position: absolute;
  left: 0px;
  bottom: 0px;
  width: 100%;
  height: 15px;
  background-color: rgba(255, 255, 255, 0.5);
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
    top: -8px;
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
    margin: 0px 3px -3px 3px;
    list-style: none;
}

a {
  font-weight: bold;
  font-size: 17px !important;
  color: var(--darkP) !important;
  padding: 4px 8px;
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
  top: 0px;
}

.active a {
  color: black !important;
  padding-bottom: 14px;
  font-weight: bolder;
  background-color: rgba(255, 255, 255, 1);
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}

@media only screen and (max-width: 1000px) {
  #brand {
    display: none;
  }

  #logo-container {
    display: none;
  }

  #menu {
    width: 100%;
    align-items: center;
    justify-content: center;
  }

  #menu ul {
    padding: 0px;
    margin-top: 0px;
    height: auto;
    margin: auto;
  }

  #menu ul li {
    margin-top: 5px !important;
  }

  
  .active a {
    color: black !important;
    padding-bottom: 36px;
}
}

@media only screen and (max-width: 1600px){
  #brand {
    display: none;
  }
}
</style>