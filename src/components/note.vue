<template>
  <div id="note">
    <header ref="header">
      <div class="img-container">
        <img src="~@/assets/img.jpg"/>
      </div>
      <div class="center-container">
      	<router-link active-class="is-active" to="/note/new" >
      	  <span @click="changeView('new')">最新</span>
      	</router-link>
      	<router-link active-class="is-active" to="/note/all" >
      	  <span @click="changeView('all')">全部</span>
      	</router-link>
      </div>
      <div class="operator">
        <span @click.stop="refresh"><icon name="refresh" :class="{ rotate: rotate }"></icon></span>
        <span class="refash" @click.stop="openMenu"><icon name="ellipsis-h"></icon></span>
      </div>
    </header>
    <transition :name="transitionName" >
	    <router-view></router-view>
    </transition>
    <drop-menu ref="dropMenu" target=".refash">
      <menu-item >1. 编辑</menu-item>
      <menu-item >2. 只显示标题</menu-item>
    </drop-menu>
  </div>
</template>
<script>
import 'vue-awesome/icons/refresh';
import 'vue-awesome/icons/ellipsis-h';

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
  },
  computed: {
  },
  watch: {
    $route(to) {
      const toView = to.name;
      this.transitionName = toView === 'all' ? 'slide-left' : 'slide-right';
    },
  },
};
</script>
<style lang="scss" scoped>
$ppr: 750px/16/1rem;
#note {
  height: 100%;
  header {
  	color: #FFF;
  	background-color: #20A0FF;
  	padding: 5px 20px;
  	display: flex;
    justify-content: space-between;
    align-items: center;
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
      .rotate {
        animation: rotateLeft 1s infinite linear;
        -webkit-animation: rotateLeft 1s infinite linear; 
      }
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
  }
}
html[data-dpr='2'] {
  #note {
    header{
      padding: 10px 40px;
      .img-container {
      	width: 80px;
        height: 80px;
      }
    }
  }
}
html[data-dpr='3'] {
  #note {
    header{
      padding: 15px 60px;
      .img-container {
        width: 120px;
        height: 120px;
      }
    }
  }
}
.slide-right-enter {
  -webkit-transform: transition(-100%, 0);
  transform: translate(-100%, 0);
}

.slide-right-enter-active {
  transition: all .5s;
}

.slide-left-enter {
  -webkit-transform: translate(100%, 0);
  transform: translate(100%, 0);
}
.slide-left-enter-active {
  transition: all .5s;
}
</style>
