<template>
  <div class="cpm">
    <div class="top-info" v-if="registry">
      <flex class="wrap" align="between" valign="middle" fulled>
        <div class="left"><Icon type="md-ribbon" /> China Package Manager@{{registry.version}}</div>
        <div class="right">
          <span><strong>{{registry.total.package}}</strong> Packages</span> • <span><strong>{{registry.total.user}}</strong> Users</span> • <span><strong>{{registry.total.version}}</strong> Versions</span> • <span><a href="javascript:void(0);">Docs</a></span>
        </div>
      </flex>
    </div>
    <div class="searcher">
      <flex class="wrap" fulled valign="middle">
        <div class="logo"><img src="https://syj-1256052570.cos.ap-shanghai.myqcloud.com/cpm-outline.png" alt="CPM LOGO" v-redirect="'/'" /></div>
        <flex class="input" :span="1" fulled>
          <flex class="search-box" blocked fulled valign="middle">
            <div class="icon"><Icon type="md-search" /></div>
            <flex class="typer" :span="1">
              <input type="text" placeholder="Search packages" v-model="search.keyword" @keyup.enter="jumpToSearch" />
            </flex>
            <div class="btn" @click="jumpToSearch">Search</div>
          </flex>
          <div class="layer" v-if="search.data.length">
            <flex class="item" align="between" valign="middle" v-for="item in search.data" :key="item.id" @click.native="jumpToPackage(item.name)">
              <flex class="left" direction="column">
                <div class="name">{{item.name}}</div>
                <div class="desc">{{item.description}}</div>
              </flex>
              <div class="right">{{item.version}}</div>
            </flex>
          </div>
        </flex>
      </flex>
    </div>
    <WoxPage></WoxPage>
    <footer>
      <p style="margin-bottom:10px;">CPM Repository</p>
      <a href="https://github.com/cevio/cpm" target="_blank" class="fork"><Icon type="logo-octocat" /> Fork On Github</a>
      <p>Copyright @ Mzftech.coM - 2018 - CPM loves you.</p>
    </footer>
  </div>
</template>
<script>
  export default {
    name: 'Application',
    data() {
      return {
        registry: null,
        search: {
          data: [],
          keyword: null
        }
      }
    },
    watch: {
      ['search.keyword'](value) {
        clearTimeout(this.typeTimer);
        if (!value) {
          this.search.data = [];
          return;
        }
        this.typeTimer = setTimeout(() => this.postSearch(), 300);
      }
    },
    beforeCreate() {
      this.$wox.on('mounted', () => this.$wox.get('/api/registry').then(data => this.registry = data));
    },
    methods: {
      postSearch() {
        this.$wox.get('/api/search/native?keyword=' + this.search.keyword).then(data => this.search.data = data);
      },
      jumpToPackage(name) {
        this.$wox.redirect('/package/' + name);
        this.search.keyword = null;
      },
      jumpToSearch() {
        if (!this.search.keyword) return;
        this.$wox.redirect('/search?q=' + this.search.keyword);
        this.search.keyword = null;
      }
    }
  }
</script>
<style lang="less" scoped>
footer{
  padding: 30px 0;
  text-align:center;
  color: rgba(27, 27, 27, .8);
  .fork{
    height: 40px;
    width: 200px;
    line-height: 40px;
    background-color: #5182E4;
    display: inline-block;
    margin-bottom: 20px;
    border-radius: 4px;
    color:#fff;
    cursor: pointer;
    i{
      font-size:14px;
      margin-right: 3px;
    }
  }
}
.top-info{
  height:30px;
  border-bottom: 1px solid #eee;
  .right{
    color:#999;
    font-size:16px;
    span{
      color:#333;
      font-size:12px;
      strong{
        color:#5182E4;
      }
    }
  }
}
.searcher{
  height: 52px;
  border-bottom: 1px solid #eee;
  .logo{
    padding-right: 10px;
    cursor: pointer;
    img{
      width: 70px;
    }
  }
  .input{
    box-sizing: border-box;
    padding: 5px 0 5px 0px;
    position: relative;
    .layer{
      position: absolute;
      z-index: 99;
      top: 46px;
      left: 0;
      background-color: #fff;
      width: 100%;
      border:1px solid rgba(0,0,0,.05);
      box-shadow: 4px 4px 1px rgba(0,0,0,.1);
      .item{
        padding: 10px 15px;
        border-bottom: 1px solid #eee;
        cursor: pointer;
        transition:all .3s ease;
        .left{
          .name{
            font-weight: 500;
          }
          .desc{
            color:#999;
          }
        }
        &:last-child{
          border:0;
        }
        &:nth-child(2n+2) {
          background-color: #f8f8f8;
        }
        &:hover{
          background-color: #f4faff;
        }
      }
    }
    .search-box{
      background-color: rgba(0,0,0,.05);
      border-radius: 4px;
      overflow: hidden;
      .icon{
        display: inline-block;
        width: 40px;
        text-align: center;
        font-size:18px;
        color:#9e9e9e;
      }
      .typer{
        box-sizing: border-box;
        padding-right: 20px;
        input{
          width: 100%;
          outline: none;
          border:0;
          line-height: 30px;
          background-color: transparent;
          font-size: 14px;
        }
      }
      .btn{
        background-color: #5182E4;
        height: 52px;
        line-height: 52px;
        text-align: center;
        width: 58px;
        color:#fff;
        cursor: pointer;
      }
    }
  }
}
.inner{
  padding: 20px 0;
}
</style>
