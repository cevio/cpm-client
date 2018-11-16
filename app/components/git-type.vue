<template>
  <a :href="url" target="_blank"><Icon type="logo-github" /> {{name}}</a>
</template>
<script>
  import url from 'url';
  export default {
    name: "GitType",
    props: {
      target: [Object, String]
    },
    computed: {
      url() {
        if (typeof this.target === 'string') return this.uri(this.target);
        return this.uri(this.target.url);
      },
      name() {
        if (typeof this.target === 'string') {
          const location = url.parse(this.target);
          const host = location.host;
          if (/github\.com/i.test(host)) return 'github';
          return host;
        } else {
          switch (this.target.type) {
            case 'git': return 'github';
            case 'gitlab': return 'gitlab';
            default: return this.target.type;
          }
        }
      }
    },
    methods: {
      uri(value) {
        const exec = /(http.+)/.exec(value);
        if (!exec) return value;
        return exec[1];
      }
    }
  }
</script>