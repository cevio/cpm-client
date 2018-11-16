```javascript
#!/usr/bin/env node

const childProcess = require('child_process');
const argv = process.argv.slice(2);

// please change you npm registry
argv.push('--registry=http://npm.mzftech.cn');

// using child_process spawn
childProcess.spawn('npm', argv, { 
  stdio: 'inherit' 
});
```