import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles as PrismaRoles } from '@prisma/client';
import { Request } from 'express';
import { ClientsRepository } from './../prisma/repositories/clients';

// How decorators priority works.
// Nr.1 priority are method decorators
// Nr.2 priority are class decorators
// Decorators can be either Roles, Authenticated or Public.
// Nr.1 is Public decorator that can be applied only to methods to make it public to all users
// Nr.2 is Roles decorator that specifies what roles user has to have in order to query method
// Nr.3 is Authorized decorator that tells that in order to query endpoint user should be authenticated

// check goes as follows
// 1. Check whether method has Public decorator and in case found permit access to endpoint.
// 2. No Public decorator but also check in case no other decorators are present. In case nothing is specified
//    (no Roles or Authorized decorator on class and method) permit access to endpoint.
// 3. Check whether method has Roles decorator in case it does query user and check for roles match
// 4. Check whether method has Authorized decorator in case it does query user and if found permit access to endpoint
//    (does not matter what role user has)
// 5. Point 3. but for class Roles decorator
// 6. Point 4. but for class Authorized decorator

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector,
    private ClientsRepository: ClientsRepository) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const classRoles = this.reflector.get<PrismaRoles[]>('roles', context.getClass());
    const methodRoles = this.reflector.get<PrismaRoles[]>('roles', context.getHandler());
    const authenticatedClass = this.reflector.get<PrismaRoles[]>('authenticated', context.getClass());
    const authenticatedMethod = this.reflector.get<PrismaRoles[]>('authenticated', context.getHandler());
    const publicMethod = this.reflector.get<PrismaRoles[]>('public', context.getHandler());
    if ((!classRoles && !methodRoles && !authenticatedClass && !authenticatedMethod) || publicMethod) {
      // nothing specified or method has public decorator
      return true;
    }
    const request: Request = context.switchToHttp().getRequest();
    const bearer: string | undefined = request.get('Authorization');
    if (!bearer) return false; // no token deny access
    const token = bearer.slice(7);
    const user = await this.ClientsRepository.getUserByUserName(((request.query || {}).username || '') as string);
    if (!user) return false; // no user found deny access
    if (methodRoles) return methodRoles.indexOf(user.role) !== -1;
    if (authenticatedMethod) return true;
    if (classRoles) return classRoles.indexOf(user.role) !== -1;
    return true;
  }
}
