<template>
<div class="whole">
  <div class="pagex">
    <flex class="wrap" align="between" valign="middle">
      <span class="info">{{count}} packages found</span>
      <Page :total="count" class="pagebar" :current="page" @on-change="change" />
    </flex>
  </div>
  <div class="wrap list">
    <flex class="item" v-for="item in list" :key="item.name" valign="middle" v-redirect="'/package/' + item.name">
      <flex class="left" :span="1" direction="column">
        <div class="title">{{item.name}}</div>
        <div class="desc">{{item.description}}</div>
      </flex>
      <flex class="maintainers" valign="bottom" align="center" direction="column">
        <flex align="right">
          <flex class="member" align="right" v-for="m in item.maintainers" :key="m.name">
            <Tooltip :content="m.name" placement="bottom">
              <Avatar :src="m.avatar" size="small" shape="square" />
            </Tooltip>
          </flex>
        </flex>
        <div class="tool">v{{item.version}} Published <span>{{item.mtime | Ago}}</span></div>
      </flex>
    </flex>
  </div>
</div>
  
</template>
<script>
  export default {
    name: "SearchPage",
    props: {
      count: Number,
      keyword: String,
      list: Array,
      page: {
        type: Number,
        default: 1
      },
      size: {
        type: Number,
        default: 10
      }
    },
    methods: {
      change(value) {
        this.$wox.redirect(`/search?q=${keyword}&page=${value}`)
      }
    }
  }
</script>
<style lang="less" scoped>
.pagex{
  background-color: #f9f9f9;
  padding: 20px 0;
  border-bottom: 1px solid #eee;
  ul{
    margin: 0;
  }
  .info{
    font-size:14px;
  }
}
.pagebar{
  margin-top: 10px;
}
.list{
  padding: 10px 0;
  .item{
    padding: 15px 0;
    border-bottom: 1px solid #eee;
    cursor: pointer;
    .title{
      font-size:14px;
      font-weight: 500;
    }
    .desc{
      color:#999;
      margin-top: 3px;
    }
    .tool{
      color:#ccc;
      margin-top: 5px;
      span{
        color:#5182E4;
      }
    }
    .maintainers{
      .member{
        margin-left: 5px;
      }
    }
  }
}
</style>