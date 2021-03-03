<template>
    <div>
        <Header></Header>
        <div class="content">
            <div v-if="username !== ''">
                <p>Home page for {{ username }}</p>
                <p>Here we need to have a way to access the fridge and the pantry</p>
                <div id="inventory-container">
                    <div id="fridge">
                        <h4>Fridge <span class="add-button">+</span></h4>
                        <p> Fridge table
                        </p>
                    </div>
                    <div id="pantry">
                        <h4>Pantry <span class="add-button">+</span></h4>
                        <p> Pantry table
                        </p>
                    </div>
                </div>
            </div>
            <div v-else>This page cannot be accessed without authentication</div>
        </div>
    </div>
</template>

<script>
// import Api from "../api";
import { getJwtToken, getUserIdFromToken } from "../auth";
import Header from "../components/Header"

export default {
  name: "Home",
  data() {
    return {
        username: '',
    };
  },
  components: {
    Header: Header,
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

div {
    width: 100%;
}

#inventory-container {
    display: flex;
}

h4 {
    display: flex;
    position: relative;
}

.add-button {
    position: absolute;
    right: 2%;
}

* {
    border: black 1px solid;
}

</style>