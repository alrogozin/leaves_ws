import {
  Controller,
  Get,
  Param,
  UseBefore,
  UseAfter,
  UseInterceptor,
  Action,
  OnUndefined,
  Post, Body,
} from 'routing-controllers';
import 'reflect-metadata';
import { LoggingAfter, LoggingBefore } from '../middleware/middleware';
import { Info } from '../model/info';
import { OraMng } from '../database/oramng';
import { DeclsByCnu } from '../model/decls_by_cnu';

@Controller()

@UseBefore(LoggingBefore)
@UseAfter(LoggingAfter)

// @UseInterceptor(function (action: Action, content: any) {
//   // Замена content'а response'а:
//   console.log('change response');
//   content = `interceptor`;
//   return content;
// })

export class UserController {
  @Get(`/about`)
  async getAbout() {
    const orcl = new OraMng();
    return  await orcl.test();
  }

  @Get('/users/:id')
  getOne(@Param('id') id: number) {
    console.log('Do something in GET function ... ');
    return `This action returns user #${id}`;
  }

  @Post('/decls_by_cnu/:id')
  @OnUndefined(204)
  async postDeclsByCnuId(@Param('id') id: number, @Body() info: DeclsByCnu) {
    const orcl = new OraMng();
    return await orcl.decls_by_cnu_id(id);
  }

  @Post('/users/:id')
  @OnUndefined(204)
  postOne(@Param('id') id: number, @Body() info: Info) {
    console.log(JSON.stringify(info));
  }

}