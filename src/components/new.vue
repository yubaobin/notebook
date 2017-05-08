<template>
  <div id="new" :style="{ height: height }">
    <div class="search" ref="search">
  	  <div class="search-btn" @click="search"><icon name="search"></icon>搜索</div>
  	</div>
  	<scroller class="new-list" ref="scroller" :on-refresh="refresh" :on-infinite="infinite">
  	  <div class="list-item" v-for="item in items">
  	  	<div class="title"><icon name="pencil"></icon><span>渲染性能</span></div>
  	  	<div class="comment">网页生成过程: 1.html代码转化成DOM。2.css代码转化成cssom</div>
  	  	<div class="img"></div>
  	  	<div class="info">
  	  	  <span>17-04-20</span><span>51.25K</span>
  	  	</div>
  	  </div>
  	</scroller>
  </div>
</template>
<script>
import 'vue-awesome/icons/search';
import 'vue-awesome/icons/pencil';
import { mapGetters } from 'vuex';
export default {
  name: 'new',
  data() {
    return {
      docHeight: 0,
      searchHeight: 0,
      items: [1, 2, 3, 4],
    };
  },
  mounted() {
    this.docHeight = document.documentElement.clientHeight;
    this.searchHeight = this.$refs.search.offsetHeight;
    this.$refs.scroller.resize();
  },
  methods: {
    search() {
      console.log('跳转到搜索页面');
    },
    refresh(done) {
      console.log('下拉刷新');
      window.setTimeout(() => {
        done();
        console.log('下拉刷新完成');
      }, 2000);
    },
    infinite(done) {
      console.log('上拉加载');
      window.setTimeout(() => {
        this.items.push(5);
        console.log(this.items);
        done();
      }, 2000);
    },
  },
  computed: {
    ...mapGetters([
      'bottomHeight',
      'topHeight',
    ]),
    height() {
      return `${this.docHeight - this.bottomHeight - this.topHeight - this.searchHeight}px`;
    },
  },
};
</script>
<style scoped lang="scss">
$ppr: 750px/16/1rem;
#new {
  position: relative;
  padding: 0 12px;
  .search {
  	padding: 7px 0;
  	height: 25px;
    .search-btn {
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      background-color: #CDCDCD;
      opacity: .4;
      font-size: 12px;
      .fa-icon {
        width: auto;
        height: 12px;
        margin-right: 1%;
      }
    }
  }
  .new-list {
  	position: relative;
  	.list-item {
  	  display: block;
  	  border-bottom: 1px #ECE8E8 solid;
  	  .title {
  	  	display: flex;
  	    font-size: 30px/$ppr;
  	    margin-top: 20px/$ppr;
  	    .fa-icon {
          color: #20A0FF;
          width: auto;
          height: 36px/$ppr;
          margin-right: 2%;
  	    }
  	  }
  	  .comment {
  	  	font-size: 25px/$ppr;
  	  	color: #AFABAB;
  	  	margin: 30px/$ppr 0;
  	  }
  	  .img {
  	  	width: 200px/$ppr;
  	  	height: 150px/$ppr;
  	  	background-image: url(~@/assets/img.jpg);
  	  	background-repeat: no-repeat;
        background-position: 50% 50%;
  	  }
  	  .info {
  	  	color: #CDCDCD; 
        font-size: 22px/$ppr;
        margin: 30px/$ppr 0;
        span:nth-of-type(1) {
          margin-right: 30px/$ppr;
        }
  	  }
    }
  }
}
html[data-dpr='2'] {
  #new {
  	padding: 0 24px;
    .search {
      padding: 14px 0;
      height: 50px;
      .search-btn {
        font-size: 24px;
        .fa-icon {
          height: 24px;
        }
      }
    } 
  }
}
html[data-dpr='3'] {
  #new {
  	padding: 0 36px;
	.search {
	  padding: 21px 0;
	  height: 75px;
	  .search-btn {
	    font-size: 36px;
	    .fa-icon {
	      height: 36px;
	    }
	  }
	}
  }
}
</style>
