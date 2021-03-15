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
            <th>Delete</th>
          </tr>  
        </thead>
        <tbody>
          <tr v-for="(u, index) in users" :key="index">
            <td><input type="radio" :value="index" v-model="selectedIndex"/></td>
            <td>{{u.name}}</td>
            <td>{{u.username}}</td>
            <td :class="u.role < 1 ? ('admin-role') : (u.role === 1 ? ('user-role') : ('deleted'))" >{{u.role === 0 ? ('admin') : ( u.role === 1 ? ('user') : ('deleted') ) }}</td>
            <td>
              <img v-if="u.role !== 2" @click="deleteUser(u.username)" src="../assets/trash.svg" height="20" width="20"/>
              <img v-else @click="recoverUser(u.username)" src="../assets/recover.svg" height="20" width="20"/>
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
      // let index = this.users.indexOf(username)
      // this.users.splice(index, 1)
      console.log('clicked delete')
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
        await Api.editAdmin(this.users[this.selectedIndex].username, 0)
      }
      this.getData()
    },
    async revokeAdmin(){
      if(this.selectedIndex !== null){
        await Api.editAdmin(this.users[this.selectedIndex].username, 1)
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
  margin: 10px;
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