<template>
  <div>
    <Header/>
    <br />
    <div class="content">
      <div id="main-buttons">
        <router-link :to="`login`"><button>Login</button></router-link>
        <router-link :to="`register`"><button>Register</button></router-link>
      </div>
    </div>
  </div>
</template>

<script>
// import Api from "../api";
import { deleteJwtToken } from  '../auth'
import Header from "../components/Header"

export default {
  name: "Landing",
  data: function () {
    return {

    };
  },
  components: {
    Header
  },
  created: function () {
    // this.loading = true;
    // Api.getArticles().then((res) => {
    //   this.articles = res.data;
    //   this.loading = false;
    // });
    deleteJwtToken()
  },
};
</script>

<style scoped>

#main-buttons {
  width: 100%;
  height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

button {
  width: 160px;
  height: 40px;
  font-size: 18px;
  font-weight: bold;
  margin: 20px;
  border: 2px solid var(--darkP);
  background-color: var(--darkP);
  border-radius: 4px;
  color: white;
}

</style>