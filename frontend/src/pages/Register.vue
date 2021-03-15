<template>
  <div class="col-md-12">
    <Header/>
    <br/>
    <div class="card card-container">
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      />
      <form name="form" @submit.prevent="handleRegister">
        <div>
          <div class="form-group">
            <label for="username">Name</label>
            <input
              v-model="name"
              type="text"
              class="form-control"
              name="name"
            />
          </div>
          <div class="form-group">
            <label for="username">Username</label>
            <input
              v-model="username"
              type="username"
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
              @input="checkPassword"
              @change="checkPassword" 
            />
          </div>
          <div class="form-group">
            <button type="button" @click="handleRegister()" class="btn btn-primary btn-block" :disabled="isValidPassword === false || name === '' || username === ''">
              <span
                v-show="loading"
                class="spinner-border spinner-border-sm"
              ></span>
              <span>Sign Up</span>
            </button>
          </div>
        </div>
      </form>

      <div v-if="!isValidPassword && message" class="alert alert-danger">
        {{ message }}
      </div>
      <div v-else-if="isValidPassword && message" class="alert alert-success">
        {{ message }}
      </div>
      
    </div>
  </div>
</template>

<script>
import Api from "../api";
import Header from "../components/Header"

export default {
  name: "Register",
  data() {
    return {
      name: "",
      username: "",
      password: "",
      loading: false,
      message: "",
      isValidPassword: false
    };
  },
  components: {
    Header
  },
  methods: {
    handleRegister() {
      this.message = "";
      this.loading = true;

      if(this.isValidPassword !== true){
        this.loading = false
        this.message = "Password requirements are at least 8 characters. And, at least 1 number and 1 upper case letter"
        return;
      }

      Api.signup(this.username, this.password, this.name)
        .then(() => {
          this.$router.push("/login");
        })
        .catch((error) => {
          console.log(error);
          if (error.response) {
            this.message = error.response.data.message;
          }
          this.loading = false;
        });
    },
    checkPassword(){
      console.log('checking password')
      let hasNumber = false
      let hasUpper = false
      let hasLower = false
      let str = this.password
      for(let i = 0; i < str.length; i++){
        if(/[^0-9]/.test(str.charAt(i))){
          //not a number
          if(/[^A-Z]/.test(str.charAt(i))){
            //not an upper
            hasLower = true
          }
          else {
            //found upper
            hasUpper = true
          }
        }
        else {
          //found a number
          hasNumber = true
        }
      }

      if(!(hasNumber && hasUpper && hasLower && str.length > 7)){
        this.isValidPassword = false
        this.loading = false
        this.message = "Password requirements are at least 8 characters. And, at least 1 number and 1 upper case letter"
        return;
      }
      else {
        this.isValidPassword = true
        this.message = "Good Password"
      }
    }
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
  background-color: #f7f7f7;
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

.alert-success {
  background-color: rgb(158, 233, 158);
  color: green;
}
</style>