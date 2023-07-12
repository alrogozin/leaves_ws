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
  getAbout() {
    console.log('About Leaves_WS application');
    return `About Leaves_WS application. Нужно описание вызовов и пр.`;
  }

  @Get('/users/:id')
  getOne(@Param('id') id: number) {
    console.log('Do something in GET function ... ');
    return `This action returns user #${id}`;
  }

  @Post('/users/:id')
  @OnUndefined(204)
  postOne(@Param('id') id: number, @Body() info: Info) {
    console.log(JSON.stringify(info));
  }

}