import { SetMetadata } from "@nestjs/common";
import { Roles as PrismaRoles } from "@prisma/client";

/**
 * modifier that is used to specify list of roles that can access specific route
*/
export const Roles = (...roles: PrismaRoles[]) => SetMetadata('roles', roles);
/**
 * modifier that is used to make route public to all users
 * !! Route becomes public so no authentication is required at all
 * METHOD DECORATOR ONLY. In case whole class should be public do not put any roles
 * decorators and class will be public.
*/
export const Public = () => SetMetadata('public', true);
/**
 * modifier that is used to make route availible to all authenticated users.
 * User does not need to have a specific role to access route he just needs to be logged in.
*/
export const Authenticated = () => SetMetadata('authenticated', true);
