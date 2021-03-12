<template>
  <div>
    <Header/>
    <div class="content">
      <b-navbar>
        <b-navbar-brand :to="{ path: '/' }">Blog Admin</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item :to="{ path: '/logout' }">Logout</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
      <br />
      <hr />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header'

export default {
  name: "Admin",
  data(){
    return {

    }
  },
  components: {
    Header
  }
};
</script>