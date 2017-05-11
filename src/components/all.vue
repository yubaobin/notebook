<template>
  <div id="all" class="x_panel" :style="{ height: height }">
    <div class="search" ref="search">
  	  <span class="operate-icon" @click="openNew"><icon name="plus-square-o"></icon></span>
  	  <div class="search-btn" @click="search"><icon name="search"></icon>搜索</div>
  	  <span class="operate-icon sort" @click.stop="openMenu"><icon name="list"></icon></span>
  	</div>
    <div v-if="noteId">内容</div>
  	<scroller class="new-list" snappingHeight="200" ref="scroller" v-else
              :on-refresh="refresh" :on-infinite="infinite" >
  	  <div class="list-item" v-for="note in noteList" @click="gotoDetail(note.id)">
  	  	<div class="title"><icon name="folder"></icon><span>{{ note.title }}</span></div>
  	  	<template v-if="showTitle">
	  	  <div class="comment" @click="handle">{{ note.title }}</div>
	  	  <div class="img" :style="{backgroundImage: 'url('+note.img+')'}"></div>
  	  	</template>
  	  	<div class="info">
  	  	  <span>{{ note.time }}</span><span>{{ note.size }}</span>
  	  	</div>
  	  </div>
  	</scroller>
  	<drop-menu ref="dropMenu" target=".sort" class="sortMenu">
      <menu-item index="1">按修改时间排序<icon name="check"></icon></menu-item>
      <menu-item index="2">按名称排序<icon name="check"></icon></menu-item>
      <menu-item index="3">按创建时间排序<icon name="check"></icon></menu-item>
    </drop-menu>
    <transition name="fade">
      <div class="modal cover" v-show="modalShow">
        <div class="modal-mask"></div>
        <div class="modal-dialog">
      	  <div class="modal-head">新建文件夹</div>
      	  <div class="modal-body">
      	    <input type="text" v-model="newFolderName" ref="newFolderName"/>
      	  </div>
      	  <div class="modal-footer">
      	    <div class="modal-btn"><button @click="hideNew">取消</button></div>
      	    <div class="modal-btn"><button>确认</button></div>
      	  </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import 'vue-awesome/icons/search';
import 'vue-awesome/icons/pencil';
import 'vue-awesome/icons/folder';
import 'vue-awesome/icons/plus-square-o';
import 'vue-awesome/icons/list';
import 'vue-awesome/icons/check';
import { mapGetters } from 'vuex';

export default {
  name: 'new',
  data() {
    return {
      docHeight: 0,
      searchHeight: 0,
      noteList: [],
      modalShow: false,
      newFolderName: '',
      noteId: this.$route.params.noteId,
    };
  },
  created() {
    this.listNote({ pageNumber: 0, pageSize: 10 });
    if (this.noteId) {
      this.$store.dispatch('changeNoteId', { noteId: this.noteId });
      const title = this.loadNote();
      this.$store.dispatch('changeTitle', { title });
    }
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
    loadNote() {
      return '标题';
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
      this.listNote({ pageNumber: 0, pageSize: 10 }).then((response) => {
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
    openMenu() {
      this.$refs.dropMenu.open();
    },
    openNew() {
      this.modalShow = true;
      setTimeout(() => {
        this.$refs.newFolderName.focus();
      }, 100);
    },
    hideNew() {
      this.modalShow = false;
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
@mixin cover() {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
}
#all {
  .search {
  	padding: 7px 0;
  	height: 25px;
  	opacity: .4;
  	display: flex;
  	justify-content: space-between;
    .search-btn {
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      background-color: #CDCDCD;
      font-size: 12px;
      width: 80%;
      .fa-icon {
        width: auto;
        height: 12px;
        margin-right: 1%;
      }
    }
    .operate-icon {
      display: flex;
      align-items: center;
      .fa-icon {
        width: auto;
        height: 20px;
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
  .sortMenu {
    .menu-item {
      display: flex;
      align-items: center;
      padding: 20px/$ppr;
      .fa-icon {
        width: auto;
        height: 35px/$ppr;
        margin-left: 15px;
        visibility: hidden;
      }
      &.active {
      	.fa-icon {
      	  visibility: visible;
      	}
      }
    }
  }
  .cover {
  	position: fixed;
  	@include cover;
  	.modal-mask {
      position: absolute;
      background: rgba(0,0,0,.3);
      @include cover;
  	}
  	.modal-dialog {
      position: absolute;
      top: 35%;
      left: 0;
      right: 0;
      margin: auto;
      z-index: 101;
      background: #fff;
      border-radius: 30px/$ppr;
      width: 600px/$ppr;
      box-shadow: 0 1px 3px rgba(0,0,0,.2);
      font-size: 30px/$ppr;
      text-align: center;
      .modal-head {
        padding: 30px/$ppr 0px;
      }
      .modal-body {
      	margin-bottom: 20px/$ppr;
        input{
      	  font-size: 30px/$ppr;
      	  width: 80%;
      	  padding: 10px/$ppr;
      	  border: 1px solid #E2E2E2;
        }
      }
      .modal-footer { 
      	display: flex;
        justify-content: center;
        align-items: center;
        border-top: 1px solid #E2E2E2;
      	.modal-btn {
      	  flex: 1;
      	  border-right: 1px solid #E2E2E2;
      	  padding: 20px/$ppr 0px;
      	  &:active {
  	        background-color: #E2E2E2;
  	      }
      	  &:last-child {
            border-right: none;
      	  }
      	  button {
      	  	color: #20A0FF;
      	    font-size: 30px/$ppr;
      	  }
        }
      }
  	}
  }
}
html[data-dpr='2'] {
  #all {
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
      .operate-icon {
      	.fa-icon {
          width: auto;
          height: 40px;
        }
      }
    } 
  }
}
html[data-dpr='3'] {
  #all {
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
	    .operate-icon {
	  	  .fa-icon {
          width: auto;
          height: 40px;
        }
      }
	  }
  }
}
</style>
