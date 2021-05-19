<template>
  <div>
    <h1>Todo App</h1>
    <TodoForm/>
    <TodoList/>
  </div>
</template>

<script>
import TodoForm from '@/components/TodoForm'
import TodoList from '@/components/TodoList'

export default {
  name: 'TodoView',
  components: {
    TodoForm,
    TodoList,
  },
  created() {
    const isLoggedIn = this.$store.getters.isAuthenticated
    if (!isLoggedIn) {
      this.$router.push('/login')
    }
  },
}
</script>

<style>

</style>