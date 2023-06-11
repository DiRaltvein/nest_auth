import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ClientsRepository {
    constructor(private PrismaService: PrismaService) {}

    public async getUserByUserName(username: string): Promise<User | null> {
        return await this.PrismaService.user.findUnique({
            where: {
                username
            }
        });
    }

    public async createUser(username: string, password: string): Promise<User | null> {
        return await this.PrismaService.user.create({
            data: {
                username,
                password
            }
        });
    }
}
