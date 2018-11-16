```javascript
const { 
  ContextComponent 
} = require('@clusic/method');

class AuthorizationService extends ContextComponent {
  constructor(ctx) {
    super(ctx);
  }

  async Login(account, password) {}
  async User(account) {}
};

module.exports = AuthorizationService;
```