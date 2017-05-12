<template>
  <div id="new" class="x_panel" :style="{ height: height }">
    <div class="search" ref="search">
  	  <div class="search-btn" @click="search"><icon name="search"></icon>搜索</div>
  	</div>
  	<scroller class="new-list" ref="scroller" :on-refresh="refresh" :on-infinite="infinite">
  	  <div class="list-item" v-for="note in noteList" @click="gotoDetail(note.id)">
        <div class="title"><icon name="folder"></icon><span>{{ note.title }}</span></div>
        <template v-if="showTitle">
        <div class="comment">{{ note.title }}</div>
        <div class="img" :style="{backgroundImage: 'url('+note.img+')'}"></div>
        </template>
        <div class="info">
          <span>{{ note.time }}</span><span>{{ note.size }}</span>
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
      noteList: [],
    };
  },
  created() {
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
      window.setTimeout(() => {
        this.$toast('笔记同步成功!', {
          horizontalPosition: 'center',
          className: 'info',
          duration: 1500,
        });
        done();
      }, 2000);
    },
    infinite(done) {
      this.listNote({ pageNumber: 1, pageSize: 10 }).then((response) => {
        const data = this.Mock.mock(response.data);
        if (data.done) {
          done(true);
        } else {
          this.noteList = this.noteList.concat(data.list);
          done();
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    listNote(params) {
      return new Promise((resolve, reject) => {
        this.axios.get('/listNote', {
          params: {
            pageSize: params.pageSize,
            pageNumber: params.pageNumber,
          },
        }).then((response) => {
          resolve(response);
        }).catch((error) => {
          reject(error);
        });
      });
    },
    gotoDetail(id) {
      this.$router.push(`/note/detail/${id}`);
    },
  },
  computed: {
    ...mapGetters([
      'bottomHeight',
      'topHeight',
      'showTitle',
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
        font-size: 16px/$ppr;
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
