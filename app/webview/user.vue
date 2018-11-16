<template>
  <div class="user">
    <div class="wrap">
      <p v-if="packages.error" align="center" style="padding: 30px;">{{packages.error}}</p>
      <div class="bs" v-else>
        <div class="person">
          <h1> <Avatar :src="packages.user.avatar" /> Packages by {{packages.user.account}} <{{packages.user.email}}> - [{{packages.user.name}}]</h1>
        </div>
        <div class="list">
          <flex class="item" align="between" valign="middle" blocked v-for="item in packages.packages" :key="item.name" v-redirect="'/package/' + item.name">
            <div class="left">
              <div class="title">{{item.name}}</div>
              <div class="desc">{{item.description}}</div>
            </div>
            <div class="right"><Icon type="md-clock" /> {{item.mtime | Ago}}</div>
          </flex>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "UserPage",
    props: {
      packages: Object
    }
  }
</script>
<style lang="less" scoped>
.user{
  padding: 30px 0;
  .list{
    padding: 15px 0;
    .item{
      margin-bottom: 10px;
      border:1px solid #eee;
      padding: 10px 15px;
      border-radius: 4px;
      cursor: pointer;
      .title{
        font-size:14px;
        font-weight: 500;
      }
      .desc{
        color:#999;
      }
      .right{
        color:#5182E4;
      }
    }
  }
}
</style>