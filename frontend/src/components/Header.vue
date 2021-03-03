<template>
  <div id="header">
    <div id="header-container">
        <div id="logo">
            XX
        </div>
        <div id="menu">
            <ul>
                <li><router-link :to="`home`">Home</router-link></li>
                <!-- <li><router-link :to="`recipes`">Recipes</router-link></li> -->
                <li><router-link :to="`logout`">Logout</router-link></li>
                <li id="last" v-if="isAdmin"><router-link :to="`admin`">Admin</router-link></li>
            </ul>
        </div>
    </div>
  </div>
</template>

<script>
// import Api from "../api";

export default {
  name: "Header",
  data: function () {
    return {
        isAdmin: false,
    };
  },
  methods: {
      checkIsAdmin(){
        
      },
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

#last {
    margin-right: 0px !important;
}

a {
    color: black !important;
}

</style>