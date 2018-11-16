<template>
  <div class="page">
    <div class="intro">
      <h1>What can you make with 800,000 building blocks?</h1>
      <p style="margin-top:20px;">The npm registry hosts the world’s largest collection of free, reusable code.</p>
      <Row class="column">
        <Col :span="8">
          <flex class="item" align="center" valign="middle" direction="column">
            <img src="https://static.npmjs.com/images/binoculars-dot.svg" style="height: 100px;">
            <div class="title">Find</div>
            <div class="desc">Libraries like <a href="javascript:void(0);" v-redirect="'/package/jquery'">jQuery</a>, <a href="javascript:void(0);" v-redirect="'/package/bootstrap'">Bootstrap</a>, <a href="javascript:void(0);" v-redirect="'/package/react'">React</a>, and <a href="javascript:void(0);" v-redirect="'/package/angular'">Angular</a>, and components from frameworks such as <a href="javascript:void(0);" v-redirect="'/package/ember'">Ember</a>.</div>
          </flex>
        </Col>
        <Col :span="8">
          <flex class="item" align="center" valign="middle" direction="column">
            <img src="https://static.npmjs.com/images/mountain-dot.svg" style="height: 100px;">
            <div class="title">Discover</div>
            <div class="desc">Packages for mobile, IoT, front end, back end, robotics… everything you need to start building amazing things.</div>
          </flex>
        </Col>
        <Col :span="8">
          <flex class="item" align="center" valign="middle" direction="column">
            <img src="https://static.npmjs.com/images/rucksack-dot.svg" style="height: 100px;">
            <div class="title">Build</div>
            <div class="desc">Assemble packages like building blocks to quickly develop awesome new projects.</div>
          </flex>
        </Col>
      </Row>
    </div>
    <div class="code">
      <div class="wrap">
        <Row :gutter="20">
          <Col :span="8">
            <h1>Install</h1>
            <div v-html="install"></div>
          </Col>
          <Col :span="8">
            <h1>Authorization</h1>
            <div v-html="auth"></div>
          </Col>
          <Col :span="8">
            <h1>Client Tool</h1>
            <div  v-html="cli"></div>
          </Col>
        </Row>
      </div>
    </div>
  </div>
</template>
<script>
  import InstallMarkdown from '../../markdown/install.md';
  import CliMarkdown from '../../markdown/cli.md';
  import AuthorizationMarkdown from '../../markdown/authorization.md';
  export default {
    name: "IndexPage",
    data() {
      return {
        install: InstallMarkdown,
        cli: CliMarkdown,
        auth: AuthorizationMarkdown
      }
    }
  }
</script>
<style lang="less">
  .page h1{
    font-size:26px;
    font-weight: 400;
    text-align: center;
    margin-bottom: 20px;
  }
  .page p{
    text-align: center;
    color: rgb(51, 51, 51);
    font-size:14px;
  }
  .intro{
    padding: 80px 0 30px 0;
    border-bottom: 1px solid #eee;
    .column{
      width: 1200px;
      margin: 0 auto;
      margin-top: 80px;
      a{
        font-weight: 400;
      }
    }
    .item{
      .title{
        width: 230px;
        text-align: center;
        margin: 20px 0 0 0;
        font-size:14px;
      }
      .desc{
        width: 230px;
        text-align: center;
        font-weight: 400;
        box-sizing: border-box;
        padding: 0 20px;
        margin: 20px 0;
        color:rgb(51, 51, 51);;
      }
    }
  }
  .code{
    background-color: #f8f8f8;
    padding: 30px 0;
    border-bottom: 1px solid #eee;
    h1{
      margin-bottom: 20px;
      text-align:left;
    }
    pre{
      width: 100%;
      &, code{
        white-space:pre-wrap;
        word-wrap:break-word;
      }
    }
  }
</style>