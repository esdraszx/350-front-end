<template>
  <div id="app">
    <b-container>
      <router-view></router-view>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style>

:root {
  --darkP: #374375;
  --lightP: #BEC8F7;
  --centerP: #738BF5;
  --grayP: #5A5F75;
  --shadeP: #5B6EC2;
}

.content {
  width: 100%;
  position: relative;
  margin-top: 100px !important;
}

ul li {
  list-style: none;
}


a {
    color: black !important;
}

.button-img {
  cursor: pointer;
}

</style>
