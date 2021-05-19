import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

// axios 설정
axios.defaults.baseURL = 'http://localhost:8000'

const token = localStorage.getItem('token')
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todoList: [],
    errorMsg: '',
    userInfo: {},
    // 새로고침해도 ToDo에 접근가능하도록
    // 세션 5분 이상 지나도 되도록
    token: localStorage.getItem('token'),
  },
  getters: {
    getTodoList(state) {
      return state.todoList
    },
    isAuthenticated(state) {      
      const result = state.token ? true: false
      return result
      // return !!state.token
    },
  },
  mutations: {
    FETCH_TODO_LIST(state, todoList) {
      state.todoList = todoList
    },   
    UPDATE_ERROR(state, errorMsg) {
      state.errorMsg = errorMsg
    },
    CREATE_TODO(state, newTodo) {
      state.todoList.push(newTodo)
    },
    UPDATE_TODO(state, targetTodo) {
      //  todoList에서 targetTodo를 찾고
      // targetTodo의 completed 값을 변경
      state.todoList = state.todoList.map((todo) => {
        if (todo.id === targetTodo.id) {
          // 참이면 거짓으로, 거짓이면 참으로 변경
          todo.completed = !todo.completed
        }
        return todo
      })
    },
    DELETE_TODO(state, targetTodo) {
      const targetTodoIdx = state.todoList.indexOf(targetTodo)
      state.todoList.splice(targetTodoIdx, 1)
    },
    CREATE_USER(state, userInfo) {
      state.userInfo = userInfo
    },
    AUTH_USER(state, token) {
      state.token = token
    },
    LOGOUT(state) {
      state.token = ''
      localStorage.removeItem('token')
    },
  },
  actions: {
    async FETCH_TODO_LIST({ commit }) {
      // context contains commit, state, dispatch
      const TODO_LIST_URL = '/api/v1/todos/'
      const response = await axios.get(TODO_LIST_URL)
      const todoList = response.data
      commit('FETCH_TODO_LIST', todoList)
    },
    async CREATE_TODO({ commit }, newTodo) {
      const TODO_CREATE_URL = '/api/v1/todos/'
      const data = newTodo
      const response = await axios.post(TODO_CREATE_URL, data)

      commit('CREATE_TODO', response.data) // 임시...
    },
    async DELETE_TODO({ commit }, targetTodo) {
      const todoId = targetTodo.id
      const TODO_DELETE_URL = `/api/v1/todos/${todoId}/`
      await axios.delete(TODO_DELETE_URL)

      commit('DELETE_TODO', targetTodo)
    },
    async UPDATE_TODO({ commit }, targetTodo) {
      const todoId = targetTodo.id
      const TODO_UPDATE_URL = `/api/v1/todos/${todoId}/`
      const data = targetTodo // 수정된 Todo
      const response = await axios.put(TODO_UPDATE_URL, data)

      commit('UPDATE_TODO', response.data)
    },
    async CREATE_USER({ commit }, userInfo) {
      const USER_CREATE_URL = '/api/v1/accounts/signup/'
      const data = userInfo
      const response = await axios.post(USER_CREATE_URL, data)
      
      commit('CREATE_USER', response.data)
    },
    AUTH_USER({ commit }, userInfo) {
      return new Promise((resolve) => {
        const AUTH_USER_URL = '/api/token/'
        const data = userInfo

        axios.post(AUTH_USER_URL, data)
        .then((response) => {
          const token = response.data.access
          localStorage.setItem('token', token)
          commit('AUTH_USER', token)
          resolve()
        })

      })

    },
  },
  modules: {
  }
})
