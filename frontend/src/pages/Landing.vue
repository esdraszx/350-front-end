<template>
  <div>
    <b-jumbotron>
      <p>Kitchen Inventory</p>
    </b-jumbotron>
    <br />
    <ul>
      <li>
        <router-link :to="`login`">Login</router-link>
      </li>
      <li>
        <router-link :to="`register`">Register</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
// import Api from "../api";

export default {
  name: "Landing",
  data: function () {
    return {

    };
  },
  created: function () {
    // this.loading = true;
    // Api.getArticles().then((res) => {
    //   this.articles = res.data;
    //   this.loading = false;
    // });
  },
};
</script>