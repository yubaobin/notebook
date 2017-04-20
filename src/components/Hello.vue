<template>
  <div class="hello">
    <input v-model="name" />
    <button @click="changeName">修改名字master</button>
    <p>{{ storeName }}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'hello',
  data () {
    return {
      name: ''
    }
  },
  computed: {
    ...mapGetters({
      'storeName': 'getName'
    })
  },
  methods: {
    changeName () {
      this.$store.dispatch('changeName', { name: this.name })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input {
  width: 100%;
  line-height: 30px;
  border: 1px blue solid;
}
</style>
