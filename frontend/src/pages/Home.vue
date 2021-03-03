<template>
    <div>
        <div v-if="username !== ''">
            <p>Home page for {{ username }}</p>
            <p>Here we need to have a way to access the fridge and the pantry</p>
        </div>
        <div v-else>This page cannot be accessed without authentication</div>
    </div>
</template>

<script>
// import Api from "../api";
import { getJwtToken, getUserIdFromToken } from "../auth";

export default {
  name: "Login",
  data() {
    return {
        username: '',
    };
  },
  methods: {
    
  },
  created: function(){
      let token = getJwtToken()
      if(token === null){
          return;
      }

      this.username = getUserIdFromToken(token)
  },
};
</script>

<style scoped>

</style>