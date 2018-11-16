<template>
  <div class="wrap package" v-if="pkg.error">
    <p align="center">Can not find the package.</p>
  </div>
  <div class="wrap package" v-else>
    <div class="title">{{pkg.name}}</div>
    <div class="info">{{latestVersion}} • <span>{{pkg.private ? 'Private' : 'Public'}}</span> • Published {{latestTime | Ago}}</div>
    <Row class="tabs">
      <Col :span="6"><flex class="tab yellow" align="center" valign="middle" :class="{active:active === 0}" @click.native="active=0">Readme</flex></Col>
      <Col :span="6"><flex class="tab red" align="center" valign="middle" :class="{active:active === 1}" @click.native="active=1">{{deps.total}} Dependencies</flex></Col>
      <Col :span="6"><flex class="tab pure" align="center" valign="middle" :class="{active:active === 2}" @click.native="active=2">{{plugins.length}} Dependents</flex></Col>
      <Col :span="6"><flex class="tab blue" align="center" valign="middle" :class="{active:active === 3}" @click.native="active=3">{{Object.keys(pkg.versions).length}} Versions</flex></Col>
    </Row>
    <Row class="context">
      <Col :span="16">
        <div class="article markdown-body" v-show="active===0" v-html="markdown"></div>
        <div class="article" v-show="active===1">
          <div class="dep" v-for="(item, key) in deps.data" :key="key">
            <h1 style="text-transform:capitalize;">{{key}}</h1>
            <div class="dep-p">
              <flex class="pack" align="between" valign="middle" blocked v-for="(p, i) in item" :key="i">
                <a href="javascript:void(0);" v-redirect="'/package/' + i">{{i}}</a>
                <span>{{p}}</span>
              </flex>
            </div>
          </div>
        </div>
        <div class="article" v-show="active===2">
          <div class="dep">
            <h1 v-if="plugins.length">Plugin Dependencies</h1>
            <div class="dep-p">
              <flex class="pack" align="between" valign="middle" blocked v-for="p in plugins" :key="p">
                <a href="javascript:void(0);" v-redirect="'/package/' + p">{{p}}</a>
              </flex>
            </div>
          </div>
        </div>
        <div class="article" v-show="active===3">
          <Alert><strong>Tip:</strong> Click on a version number to view a previous version's package page</Alert>
          <div class="dep" v-for="p in versions" :key="pkg.name + p.label">
            <h1>{{p.label}}</h1>
            <div class="dep-p">
              <flex class="pack" align="between" valign="middle" blocked v-for="s in p.data" :key="pkg.name + s.version">
                <a href="javascript:void(0);" v-redirect="s.url">{{s.version}}</a>
              </flex>
            </div>
          </div>
        </div>
      </Col>
      <Col :span="8" class="exists">
        <p class="title">Install</p>
        <flex class="xcode" align="left" valign="middle">
          <svg viewBox="0 0 12.32 9.33"><g><line class="st1" x1="7.6" y1="8.9" x2="7.6" y2="6.9"></line><rect width="1.9" height="1.9"></rect><rect x="1.9" y="1.9" width="1.9" height="1.9"></rect><rect x="3.7" y="3.7" width="1.9" height="1.9"></rect><rect x="1.9" y="5.6" width="1.9" height="1.9"></rect><rect y="7.5" width="1.9" height="1.9"></rect></g></svg>
          <code>cpm i {{pkg.name}}</code>
        </flex>
        <Row class="descriptor">
          <Col :span="12" class="item">
            <p class="title">version</p>
            <div class="value">{{latestVersion}}</div>
          </Col>
          <Col :span="12" class="item">
            <p class="title">license</p>
            <div class="value">{{pkg.license || 'MIT'}}</div>
          </Col>
          <Col :span="12" v-if="pkg.homepage" class="item">
            <p class="title">homepage</p>
            <div class="value">
              <a :href="pkg.homepage" target="_blank">{{pkg.homepage | host}}</a>
            </div>
          </Col>
          <Col :span="12" v-if="pkg.repository" class="item">
            <p class="title">repository</p>
            <div class="value"><GitType :target="pkg.repository"></GitType></div>
          </Col>
          <Col :span="24" class="item">
            <p class="title">last publish</p>
            <div class="value">{{latestTime | Ago}}</div>
          </Col>
          <Col :span="24" v-if="pkg.maintainers.length" class="item">
            <p class="title">collaborators</p>
            <div class="value">
              <Tooltip :content="u.name" placement="top" v-for="u in pkg.maintainers" :key="u.name">
                <Avatar style="margin: 5px 5px 5px 0; cursor: pointer;" :src="u.name | avatar(users, u.email)" shape="square" v-redirect="'/~' + u.name" />
              </Tooltip>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  </div>
</template>
<script>
  import Markdown from 'markdown-it';
  import hljs from 'highlight.js';
  import gravatar from 'gravatar';
  export default {
    name: "PackagePage",
    props: {
      pkg: Object,
      version: String
    },
    data() {
      return {
        active: 0,
        users: {}
      }
    },
    filters: {
      avatar(value, users, email) {
        if (users[value]) return users[value].avatar;
        return gravatar.url(email);
      }
    },
    mounted() {
      this.getUsers();
    },
    methods: {
      getUsers() {
        this.$wox.post('/user', this.pkg.maintainers.map(user => user.name)).then(users => this.users = users);
      }
    },
    watch: {
      ["pkg.maintainers"]() {
        this.getUsers();
      }
    },
    computed: {
      latestVersion() {
        return this.latestPackage.version;
      },
      currentVersion() {
        return this.version || this.pkg['dist-tags'].latest;
      },
      latestTime() {
        return this.pkg.time[this.currentVersion];
      },
      latestPackage() {
        return this.pkg.versions[this.currentVersion];
      },
      markdown() {
        const md = new Markdown({
          html: true,
          highlight: function (str, lang) {
            if (lang && hljs.getLanguage(lang)) {
              try {
                return hljs.highlight(lang, str).value;
              } catch (__) {}
            }
            return ''; // use external default escaping
          }
        });
        return md.render(this.pkg.readme || 'no readme');
      },
      deps() {
        const result = {
          total: 0,
          data: {}
        };
        ['dependencies', 'devDependencies', 'peerDependencies'].forEach(dep => {
          if (this.latestPackage[dep] && Object.keys(this.latestPackage[dep]).length) {
            result.data[dep] = this.latestPackage[dep];
            result.total += Object.keys(this.latestPackage[dep]).length;
          }
        })
        return result;
      },
      plugins() {
        if (!this.latestPackage.plugin) return [];
        return this.latestPackage.plugin.dependencies;
      },
      versions() {
        const result = [];
        const distTags = this.pkg['dist-tags'];
        for (const i in distTags) {
          result.push({
            label: i,
            data: [
              {
                version: distTags[i],
                url: '/package/' + this.pkg.name + '/v/' + distTags[i]
              }
            ]
          });
        }
        const _verions = [];
        Object.keys(this.pkg.versions).forEach(v => {
          _verions.push({
            version: v,
            url: '/package/' + this.pkg.name + '/v/' + v
          })
        });
        result.push({
          label: 'History',
          data: _verions
        });
        return result;
      }
    },
  }
</script>
<style lang="less" scoped>
.package{
  padding: 40px 0;
  .title{
    font-size: 16px;
    font-weight: 500;
    padding-bottom: 5px;
  }
  .info{
    font-family: "Fira Mono", "Andale Mono", "Consolas", monospace;
    span{
      color:#19a974;
    }
  }
  .tabs{
    margin-top: 20px;
    .tab{
      padding: 12px 0;
      border-bottom:2px solid;
      font-weight: 600;
      border-radius: 5px 5px 0 0;
      cursor: pointer;
      transition: all .3s ease;
      &.yellow{
        color: rgb(158, 119, 0);
        border-color: #FFCD3A;
        &:hover,&.active{
          background-color: rgba(255, 205, 58, 0.2);
        }
      }
      &.red{
        color: #cb3837;
        border-color: #cb3837;
        &:hover,&.active{
          background-color: rgba(203, 56, 55, 0.2);
        }
      }
      &.pure{
        color: rgb(120, 33, 117);
        border-color: #C836C3;
        &:hover,&.active{
          background-color: rgba(200, 54, 195, 0.2);
        }
      }
      &.blue{
        color: rgb(41, 0, 138);
        border-color: #8956FF;
        &:hover,&.active{
          background-color: rgba(137, 86, 255, 0.2);
        }
      }
    }
  }
  .context{
    .article{
      word-wrap:break-word;
      padding: 20px 20px 20px 0;
      h1,h2,h3,h4,h5,h6{
        text-align: left;
      }
      .dep{
        a{
          font-size:14px;
        }
        .dep-p{
          padding: 10px 0;
          .pack{
            border: 1px solid #eee;
            margin-bottom: 10px;
            padding: 10px 15px;
            border-radius: 4px;
            span{
              color:#999;
            }
          }
        }
      }
    }
    .exists{
      padding: 0 12px;
      margin: 12px 0;
      .title{
        color: rgba(0,0,0,.5);
        font-size:12px;
        text-align: left;
      }
      .xcode{
        border:1px solid #eee;
        border-left: 6px #e1e1e1 solid;
        padding-top: 10px;
        padding-bottom: 10px;
        font-family: "Fira Mono", "Andale Mono", "Consolas", monospace;
        letter-spacing: 0px;
        font-variant-ligatures: none;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding-left: 1rem;
        padding-right: 1rem;
        border-radius: .25rem;
        svg{
          width: 0.9em;
          height: 0.9em;
          -ms-flex: none;
          flex: none;
          fill: rgba(0, 0, 0, .5);
        }
        code{
          color:rgba(0,0,0,.8);
        }
      }
      .descriptor{
        .item{
          border-bottom: 1px solid #eee;
          padding: 10px 0;
          .title{
            padding-bottom: 0
          }
          .value{
            color: rgba(0,0,0,.8);
            font-weight: 500;
            font-size: 14px;
            text-transform:capitalize;
            a:link,a:visited{
              color:rgba(0,0,0,.8);
              font-weight: 500;
              font-size: 14px;
              text-transform:capitalize;
            }
          }
          &:last-child{
            border:0;
          }
        }
      }
    }
  }
}
</style>