<template>
  <div>
    <form>
      <div class="mb-3">
        <label for="username" class="form-label">Username</label>
        <input v-model="userInfo.username" type="text" class="form-control" id="username" aria-describedby="emailHelp">
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input  v-model="userInfo.password" type="password" class="form-control" id="password">
      </div>
      <button @click.prevent="onClick" type="submit" class="btn btn-primary">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
   data() {
    return {
      userInfo: {
        username: '',
        password: '',
      },
    }
  },
  methods: {
    onClick() {
      // AUTH_USER를 호출하는 부분
      this.$store.dispatch('AUTH_USER', this.userInfo)
      .then(() => {
        this.$router.push('/todos')
      })
    },
  },
}
</script>

<style>

</style>