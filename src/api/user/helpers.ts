import bcrypt from 'bcrypt';

export const hashPass = (pass: string) => bcrypt.hashSync(pass, 10);
