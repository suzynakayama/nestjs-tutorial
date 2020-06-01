import { Controller, Get, Post, Put, Delete, Body, Req, Res, Param } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
// import { Request, Response } from 'express';
import { ItemsService } from './items.service';
import { Item } from './interfaces/item.interface';

/* Controller defines the endpoints, gets the parameters and body, and call the service methods */

@Controller('items')
export class ItemsController {
  // we need to inject the service into our controller class with the constructor
  constructor(private readonly itemsService: ItemsService) {}


  // How you can get the request and response, but this is not the Nest way of doing it
  // @Get()
  // findAll(@Res() req: Request, @Res() res: Response): Response {
  // console.log(req.url)
  // return res.send('Hello got items')
  // }
  
  @Get()
  findAll(): Promise<Item[]> {
    return this.itemsService.findAll();
  }

  @Get(':id')
  // findOne(@Param() param): string {
  //   return `Item ${param.id}`;
  //   }
  // Cleaner way of doing it:
  findOne(@Param('id') id: string): Promise<Item> {
    return this.itemsService.findOne(id);
    }

  @Post()
  create(@Body() createItemDto: CreateItemDto): Promise<Item> {
    return this.itemsService.create(createItemDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<Item> {
    return this.itemsService.delete(id);
  }

  @Put(':id')
  update(@Body() updateItemDto: CreateItemDto, @Param('id') id: string): Promise<Item> {
    return this.itemsService.update(id, updateItemDto);
  }
}
