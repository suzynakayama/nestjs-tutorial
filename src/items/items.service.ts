import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Item } from './interfaces/item.interface';

@Injectable()
export class ItemsService {
  constructor(@InjectModel('Item') private readonly itemModel: Model<Item>) {}

  // private readonly items: Item[] = [
  //   {
  //     id: '123456',
  //     name: 'One',
  //     quantity: 10,
  //     description: "item one"
  //   },
  //   {
  //     id: '789012',
  //     name: 'Two',
  //     quantity: 20,
  //     description: "item Two"
  //   },
  //   {
  //     id: '345678',
  //     name: 'Three',
  //     quantity: 30,
  //     description: "item Three"
  //   }
  // ];

  async findAll(): Promise<Item[]> {
    return await this.itemModel.find();
  };

  async findOne(id: string): Promise<Item> {
    return await this.itemModel.findOne({ _id: id });
  };

  async create(item: Item): Promise<Item> {
    const newItem = new this.itemModel(item)
    return await newItem.save();
  };

  async delete(id: string): Promise<Item> {
    return await this.itemModel.findByIdAndRemove(id);
  }

  async update(id: string, item: Item): Promise<Item> {
    return await this.itemModel.findByIdAndUpdate(id, item, { new: true })
  }
}
