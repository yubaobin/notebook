<template>
  <div id="note">
    <header>
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
        <icon name="refresh"></icon>
        <icon name="ellipsis-h"></icon>
      </div>
    </header>
	  <router-view></router-view>
  </div>
</template>
<script>
import 'vue-awesome/icons/refresh';
import 'vue-awesome/icons/ellipsis-h';

export default {
  name: 'note-view',
  methods: {
    changeView(type) {
      this.$store.dispatch('changeType', { type });
    },
  },
  computed: {
  },
};
</script>
<style lang="scss" scoped>
$ppr: 750px/16/1rem;
#note {
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
  	  	border-bottom: 1px solid #FFF;
  	  }
  	}
    .operator {
      display: flex;
      .fa-icon {
        width: auto;
        height: 40px/$ppr;
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
</style>
