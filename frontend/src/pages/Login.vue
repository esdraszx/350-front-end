<template>
  <div class="col-md-12">
    <Header/>
    <br/><br/>
    <div class="card card-container content">
      <form name="form" @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">Username</label>
          <input
            v-model="username"
            type="text"
            class="form-control"
            name="username"
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            v-model="password"
            type="password"
            class="form-control"
            name="password"
          />
        </div>
        <div class="form-group">
          <button class="btn btn-primary btn-block" :disabled="loading">
            <span
              v-show="loading"
              class="spinner-border spinner-border-sm"
            ></span>
            <span>Login</span>
          </button>
        </div>
        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">
            {{ message }}
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Api from "../api";
import { setJwtToken } from "../auth";
import Header from "../components/Header"

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      loading: false,
      message: "",
    };
  },
  components: {
    Header
  },
  methods: {
    handleLogin() {
      this.loading = true;
      this.message = "";
      
      Api.login(this.username, this.password)
        .then((res) => {
          setJwtToken(res.data[0].token);
          this.$router.push("/home");
        })
        .catch((error) => {
          console.log(error);
          if (error.response && error.response.status === 403) {
            this.message = error.response.data.message;
          }
          this.loading = false;
        });
    },
  },
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  margin-top: 75px;
  max-width: 350px !important;
  padding: 40px 40px;
}

.card {
  background-color: rgba(90, 95, 117, .85);
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}

label {
  color: var(--lightP);
  font-weight: 600;
}

button {
  border: 2px solid var(--lightP);
  background-color: var(--lightP);
  border-radius: 4px;
  color: var(--darkP);
  transition: .5s ease;
}

button:hover {
  border: 2px solid var(--darkP);
  background-color: var(--darkP);
  border-radius: 4px;
  color: var(--lightP);
  font-weight: 600;
}
</style>