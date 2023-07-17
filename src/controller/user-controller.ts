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
import { JustId } from '../model/simple_id';

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

  /*
  Файл из ldr_fiile_storage by id
  Select * from ldr_file_storage where id = :id; -- 56788981;
  */
  @Get('/ldr_file/:id')
  async get_ldr_file(@Param('id') id: number) {
    console.log('ldr_file id:', id);
    const orcl = new OraMng();
    return await orcl.get_ldr_file(id);
  }

  /*
  Список декларации по договору
  */
  @Post('/decls_by_cnu')
  @OnUndefined(204)
  // async postDeclsByCnuId(@Param('id') id: number, @Body() info: DeclsByCnu) {
  async postDeclsByCnuId(@Body() info: DeclsByCnu) {
    // console.log(`cnu_id !`);
    console.log(`cnu_id ${info.cnu_id}`);
    const orcl = new OraMng();
    return await orcl.decls_by_cnu_id(info.cnu_id);
  }

  @Post('/users/:id')
  @OnUndefined(204)
  postOne(@Param('id') id: number, @Body() info: Info) {
    console.log(JSON.stringify(info));
  }

}