<template>
  <div>
    <div class="d-flex">
      <input 
        type="text"
        ref="todoInput"
        @input="onUserInput"
        @keyup.enter="onSubmit"
        class="form-control"
        placeholder="입력"
        autofocus
      >
      <button 
        @click="onSubmit"
        class="btn btn-primary"
      >
        Add
      </button>
    </div>
    <div class="text-end"> {{ userInput.length }}/ 50자</div>
  </div>
</template>

<script>

export default {
  name: 'TodoForm',
  data() {
    return {
      userInput: '',
    }
  },
  methods: {
    // 이벤트를 핸들링
    onUserInput(e) {
      if (e.target.value.length > 50) {
        // input 태그의 value를 갱신
        // 현재 data의 userInput (딱 50자)으로 덮어씌워줌
        e.target.value = this.userInput
        return
      }
      this.userInput = e.target.value
    },
    onSubmit() {
      if (!this.userInput.length) return
      
      if (this.userInput.length === 0) {
        return
      }
      // 검증 ( 문장 길이 제한)
      if (this.userInput.length > 50) {
        const errorMsg = '너무 길어요!'
        this.$store.commit('UPDATE_ERROR', errorMsg)

        this.userInput = ''
        return
      }

      this.$store.commit('UPDATE_ERROR', '')
      // this.$store.commit('CREATE_TODO', this.newTodo(this.userInput))

      // action 호출 예정...
      this.$store.dispatch('CREATE_TODO', this.newTodo(this.userInput))
      
      this.userInput = '' // input 태그 초기화
      this.$refs.todoInput.value = ''
    },
    newTodo(content) {
      return {
        content,
      }
    },
  },
}
</script>

<style>

</style>