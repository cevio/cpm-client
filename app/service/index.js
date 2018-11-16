import { ContextComponent } from '@wox/basic';
export default class IndexService extends ContextComponent {
  constructor(ctx) {
    super(ctx);
  }

  async GetRegistry() {
    return await this.ctx.ajax.get('/registry');
  }

  async SearchNative(keyword) {
    return await this.ctx.ajax.get('/-/web/search/native?keyword=' + keyword);
  }

  async GetPackage(name) {
    return await this.ctx.ajax.get('/' + name);
  }

  async Search(keyword, page, size) {
    return await this.ctx.ajax.get('/-/web/search?keyword=' + keyword + '&page=' + page + '&size=' + size);
  }

  async User(account) {
    return await this.ctx.ajax.get('/-/web/user/' + account);
  }

  async GetUsers(accounts) {
    return await this.ctx.ajax.post('/-/web/users', accounts);
  }
}