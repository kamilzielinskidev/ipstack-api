import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { errorCondition } from '@utils';

import { comparePasswords } from './helpers';
import { User, UserDoc, UserModel } from './user.model';

export const findOneByLogin$ = (login: string) => from(UserModel.findOne({ login }));

export const findOneByCredentials$ = (login: string, password: string) =>
  findOneByLogin$(login).pipe(
    errorCondition((user) => !!user, 'User does not exists'),
    map((user) => user as UserDoc),
    errorCondition((user) => comparePasswords(password, user.password), 'Authorization unsuccessful'),
  );

export const save$ = (doc: User) => from(new UserModel(doc).save());
