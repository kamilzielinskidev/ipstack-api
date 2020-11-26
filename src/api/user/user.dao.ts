import { from } from 'rxjs';

import { User, UserModel } from './user.model';

export const findOneByLogin = (login: string) => from(UserModel.findOne({ login }));

export const save = (doc: User) => from(new UserModel(doc).save());
