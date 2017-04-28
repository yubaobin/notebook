<template>
  <div id="app">
    <router-view></router-view>
    <bottom-nav active="1">
      <item-nav @click="note" index="1"><icon name="file-text"></icon><p>笔记</p></item-nav>
      <item-nav @click="person" index="2"><icon name="user-o"></icon><p>我的</p></item-nav>
    </bottom-nav>
  </div>
</template>
<script>
import 'vue-awesome/icons/file-text';
import 'vue-awesome/icons/user-o';
import { mapGetters } from 'vuex';

export default {
  name: 'app',
  data() {
    return {
    };
  },
  methods: {
    note() {
      this.$router.push(`/note/${this.getType}`);
    },
    person() {
      this.$router.push('/person');
    },
  },
  computed: {
    ...mapGetters([
      'getType',
    ]),
  },
};
</script>

<style scoped lang="scss">
$ppr: 750px/16/1rem;
#app {
  .bottom-nav {
    border-top: 1px solid #CDCDCD;
    .item-nav {
      display: flex;
      flex-direction: column;
      .fa-icon {
        width: auto;
        height: 40px/$ppr;
      }
      p {
        margin-top: 5px/$ppr;
        font-size: 20px/$ppr;
      }
    }
  }
}
</style>
