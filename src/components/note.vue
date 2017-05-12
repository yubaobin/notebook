<template>
  <div id="note">
    <header ref="header">
      <span v-if="getNoteId" class="back" @click="back"><icon name="angle-left"></icon></span>
      <div class="img-container" v-else>
        <img src="~@/assets/img.jpg"/>
      </div>
      <div class="center-container">
        <span v-if="getNoteId" class="title">{{ getTitle }}</span>
        <template v-else>
      	  <router-link active-class="is-active" to="/note/new" >
      	    <span @click="changeView('new')">最新</span>
      	  </router-link>
      	  <router-link active-class="is-active" to="/note/all" >
      	    <span @click="changeView('all')">全部</span>
      	  </router-link>
        </template>
      </div>
      <div class="operator">
        <span @click.stop="refresh"><icon name="refresh" :class="{ rotate: rotate }"></icon></span>
        <span class="refash" @click.stop="openMenu"><icon name="ellipsis-h"></icon></span>
      </div>
    </header>
    <transition name="fade" mode="out-in">
	    <router-view></router-view>
    </transition>
    <drop-menu ref="dropMenu" target=".refash">
      <menu-item index="1"><icon name="edit"></icon>编辑</menu-item>
      <menu-item v-if="showTitle" index="2" @click="changeShowTitle"><icon name="bars"></icon>只显示标题</menu-item>
      <menu-item v-else index="2" @click="changeShowTitle"><icon name="list"></icon>显示摘要</menu-item>
    </drop-menu>
  </div>
</template>
<script>
import 'vue-awesome/icons/refresh';
import 'vue-awesome/icons/edit';
import 'vue-awesome/icons/ellipsis-h';
import 'vue-awesome/icons/bars';
import 'vue-awesome/icons/list';
import 'vue-awesome/icons/angle-left';
import { mapGetters } from 'vuex';

export default {
  name: 'note-view',
  data() {
    return {
      transitionName: '',
      rotate: false,
    };
  },
  mounted() {
    const topHeight = this.$refs.header.offsetHeight;
    this.$store.dispatch('changeTopHeight', { topHeight });
  },
  methods: {
    changeView(type) {
      this.$store.dispatch('changeType', { type });
    },
    refresh() {
      this.rotate = true;
      this.loadNote();
    },
    loadNote() {
      window.setTimeout(() => {
        this.rotate = false;
        this.$toast('笔记同步成功!', {
          horizontalPosition: 'center',
          className: 'info',
          duration: 1500,
        });
      }, 2000);
    },
    openMenu() {
      this.$refs.dropMenu.open();
    },
    changeShowTitle() {
      this.$store.dispatch('changeShowTitle', { showTitle: !this.showTitle });
    },
    back() {
      this.$router.go(-1);
    },
  },
  computed: {
    ...mapGetters([
      'showTitle',
      'getNoteId',
      'getTitle',
    ]),
  },
};
</script>
<style lang="scss" scoped>
$ppr: 750px/16/1rem;
#note {
  height: 100%;
  .back {
    .fa-icon {
      width: auto;
      height: 70px/$ppr;
    }
  }
	.img-container {
	  width: 40px;
	  height: 40px;
	  img {
	  	border-radius: 50%;
	  	width: 100%;
	  	height: 100%;
	  }
	}
	.center-container {
	  font-size: 35px/$ppr;
    .title {
      margin-left: 40px/$ppr;
    }
	  a {
      margin-right: 20px/$ppr; 
	  	color: rgba(255,255,255,.8);
      &:last-child {
        margin-right: 0;
      }
	  }
	  .is-active span{
      color: rgba(255,255,255,1);
      font-size: 38px/$ppr;
	  	border-bottom: 2px solid #FFF;
	  }
	}
  .operator {
    display: flex;
    .fa-icon {
      width: auto;
      height: 40px/$ppr;
    }
    span {
      margin-right: 30px/$ppr;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  .drop-menu {
    .menu-item {
      display: flex;
      align-items: center;
      .fa-icon {
        width: auto;
        height: 35px/$ppr;
        margin-right: 15px;
      }
      &.active {
        color: #FFF;   
      }
    }
  }
}
html[data-dpr='2'] {
  #note {
    .img-container {
      width: 80px;
      height: 80px;
    }
  }
}
html[data-dpr='3'] {
  #note {
    .img-container {
      width: 120px;
      height: 120px;
    }
  }
}
</style>
