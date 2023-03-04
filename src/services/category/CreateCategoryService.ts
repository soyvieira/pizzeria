import { PrismaClient } from '@prisma/client';
import prismaClient from '../../prisma';

interface CategoryRequest{
  name: string;
}

class CreateCategoryService{
  async execute({ name }){
    
    if(name === ''){
      throw new Error('Please, type a name')
    }

    const category = await prismaClient.category.create({
      data: {
        name: name
      },
      select:{
        id: true,
        name: true
      }
    })

  }
}

export { CreateCategoryService }