<template>
  <div id="app" class="container">
    <nav>
      <div v-if="!isLoggedIn">
        <router-link to="/signup">Signup |</router-link>
        <router-link to="/login"> Login |</router-link>
      </div>
      <div v-else>
        <router-link to="" @click.native="logout"> Logout |</router-link>
        <router-link to="/todos"> Todo</router-link>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated
    },
  },
  methods: {
    logout() {
      this.$store.commit('LOGOUT')
      this.$router.push('/login')
    },
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  max-width: 500px;
}
</style>
