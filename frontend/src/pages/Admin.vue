<template>
  <div>
    <Header/>
    <div class="content">
      <div class="admin-buttons">
        <button type="button" @click="makeAdmin()" :disabled="selectedIndex === null">Grant Admin</button>
        <button type="button" @click="revokeAdmin()" :disabled="selectedIndex === null">Revoke Admin</button>
      </div>
      <table style="width: 100%;">
        <thead>
          <tr>
            <th>&nbsp;</th>
            <th>Name</th>
            <th>Username</th>
            <th>Role</th>
            <th>Ban/Unban</th>
            <th>Delete</th>
          </tr>  
        </thead>
        <tbody>
          <tr v-for="(u, index) in users" :key="index">
            <td v-if="u.username !== ''"><input type="radio" :value="index" v-model="selectedIndex"/></td>
            <td v-if="u.username !== ''">{{u.name}}</td>
            <td v-if="u.username !== ''">{{u.username}}</td>
            <td v-if="u.username !== ''" :class="u.role < 1 ? ('admin-role') : (u.role === 1 ? ('user-role') : ('deleted'))" >{{u.role === 0 ? ('admin') : ( u.role === 1 ? ('user') : ('banned') ) }}</td>
            <td v-if="u.username !== ''">
              <img class="button-img" v-if="u.role !== 2" @click="banUser(u.username)" src="../assets/slash.svg" height="20" width="20"/>
              <img class="button-img" v-else @click="recoverUser(u.username)" src="../assets/recover.svg" height="20" width="20"/>
            </td> 
            <td v-if="u.username !== ''">
              <img class="button-img" @click="deleteUser(u.username)" src="../assets/trash-red.svg" height="20" width="20"/>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header'
import Api from '../api'

export default {
  name: "Admin",
  data(){
    return {
      users: [],
      selectedIndex: null,
      shouldUpdate: 0,
    }
  },
  components: {
    Header
  },
  mounted: async function (){
    this.getData()
  },
  methods: {
    async deleteUser(username){
      await Api.deleteUser(username)
      this.getData()
    },
    async banUser(username){
      // let index = this.users.indexOf(username)
      // this.users.splice(index, 1)
      console.log('clicked ban')
      await Api.editRoleUser(username, 2)
      this.getData()
    },
    async recoverUser(username){
      // let index = this.users.indexOf(username)
      // this.users.splice(index, 1)
      console.log('click recover')
      await Api.editRoleUser(username, 1)
      this.getData()
    },
    async makeAdmin(){
      if(this.selectedIndex !== null){
        await Api.editRoleUser(this.users[this.selectedIndex].username, 0)
      }
      this.getData()
    },
    async revokeAdmin(){
      if(this.selectedIndex !== null){
        await Api.editRoleUser(this.users[this.selectedIndex].username, 1)
      }
      this.getData()
    },
    async getData(){
      //get all users
      let response = await Api.getAllUsers()
      this.users = response.data
      this.users.sort((a, b) => (a.name > b.name) ? 1 : -1)
      this.$forceUpdate()
    }
  }
};
</script>

<style scoped>

thead {
  border-bottom: 2px solid var(--darkP);
}

tr {
  height: 30px !important;
}

.admin-buttons {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
}

button {
  width: 140px;
  margin: 10px;
  border: 2px solid var(--shadeP);
  border-radius: 4px;
  color: var(--darkP);
  transition: .5s ease;
  cursor: pointer;
  font-weight: 600;
  height: 35px;
  background-color: transparent;
}

button:hover {
  background-color: var(--lightP);
}

.admin-role {
  font-weight: bold;
  color: rgb(69, 197, 240);
}

.user-role {
  color: rgb(51, 165, 51);
}

.deleted {
  color: red;
  font-weight: bold;
}

</style>