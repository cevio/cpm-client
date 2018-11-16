import {
  ApplicationComponent,
  Controller,
  Get, Post
} from '@wox/basic';

@Controller('/')
export default class DemoController extends ApplicationComponent {
  constructor(ctx) {
    super(ctx);
  }

  @Get('/')
  async Home() {
    await this.ctx.render(this.ctx.Webview.Index);
  }

  @Get('/api/registry')
  async GetRegistry() {
    this.ctx.body = await this.Service.Index.GetRegistry();
  }

  @Get('/api/search/native')
  async SearchNative() {
    const keyword = this.ctx.query.keyword;
    this.ctx.body = await this.Service.Index.SearchNative(keyword);
  }

  @Get('/api/package/:package(.*)')
  async GetPackage() {
    this.ctx.body = await this.Service.Index.GetPackage(this.ctx.params.package);
  }

  @Get('/search')
  async Search() {
    const keyword = this.ctx.query.q;
    const page = Number(this.ctx.query.page || 1);
    const size = Number(this.ctx.query.size || 10);
    const {count, list} = await this.Service.Index.Search(keyword, page, size);
    await this.ctx.render(this.ctx.Webview.Search, {
      list,
      keyword,
      page,
      size,
      count
    });
  }

  @Get('/package/:scope/:module/v/:version')
  async RenderScopeVersionPackagePage() {
    const scope = this.ctx.params.scope;
    const module = this.ctx.params.module;
    const version = this.ctx.params.version;
    await this.ctx.render(this.ctx.Webview.Package, {
      pkg: await this.Service.Index.GetPackage(scope + '/' + module),
      version
    });
  }

  @Get('/package/:package/v/:version')
  async RenderVersionPackagePage() {
    const pathname = this.ctx.params.package;
    const version = this.ctx.params.version;
    await this.ctx.render(this.ctx.Webview.Package, {
      pkg: await this.Service.Index.GetPackage(pathname),
      version
    });
  }

  @Get('/package/:scope/:module')
  async RenderScopePackagePage() {
    const scope = this.ctx.params.scope;
    const module = this.ctx.params.module;
    await this.ctx.render(this.ctx.Webview.Package, {
      pkg: await this.Service.Index.GetPackage(scope + '/' + module)
    });
  }

  @Get('/package/:package')
  async RenderPackagePage() {
    const pathname = this.ctx.params.package;
    await this.ctx.render(this.ctx.Webview.Package, {
      pkg: await this.Service.Index.GetPackage(pathname)
    });
  }

  @Get('/~:user')
  async User() {
    const account = this.ctx.params.user;
    const packages = await this.Service.Index.User(account);
    await this.ctx.render(this.ctx.Webview.User, { packages });
  }

  @Post('/user')
  async GetUsers() {
    const accounts = this.ctx.req.body;
    this.ctx.body = await this.Service.Index.GetUsers(accounts);
  }
}