import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
  Request,
  ForbiddenException,
  HttpException,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const emailExists = await this.usersService.findEmail(createUserDto.email);

    if (emailExists) {
      throw new HttpException('Email already registered', 409);
    }
    return this.usersService.create(createUserDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  findOne(@Param('id') id: string, @Request() request: any) {
    const currentUserId = request.user.id;

    if (currentUserId !== id) {
      throw new ForbiddenException('You shall not pass');
    }

    return this.usersService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Request() request: any,
  ) {
    const currentUserId = request.user.id;

    if (currentUserId !== id) {
      throw new ForbiddenException('You shall not pass');
    }

    if (updateUserDto.email) {
      const emailExists = await this.usersService.findEmail(
        updateUserDto.email,
      );

      if (emailExists && emailExists.id !== id) {
        throw new HttpException('Email already registered', 409);
      }
    }

    return this.usersService.update(id, updateUserDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string, @Request() request: any) {
    const currentUserId = request.user.id;

    if (currentUserId !== id) {
      throw new ForbiddenException('You shall not pass');
    }

    return this.usersService.remove(id);
  }
}
