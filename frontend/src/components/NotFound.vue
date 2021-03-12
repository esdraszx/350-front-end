<template>
    <div>
        <Header/>
        <div class="content" id="not-found">
            <h1>WOW! Page not found: 404!</h1>
            <img src="../assets/dog.gif"/>
        </div>
    </div>
</template>

<script>
import Header from "./Header"
// import Api from "../api";
// import { getRolePermissions, getJwtToken } from '../auth'

export default {
  name: "NotFound",
  data: function () {
    return {
    };
  },
  components: {
    Header
  },
  methods:{
  },
};
</script>

<style scoped>
.content {
    text-align: center !important;
}

img {
    margin: auto;
}

</style>