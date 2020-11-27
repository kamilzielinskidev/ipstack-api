import bcrypt from 'bcrypt';

export const comparePasswords = (input: string, password: string) => bcrypt.compareSync(input, password);

export const hashPass = (pass: string) => bcrypt.hashSync(pass, 10);
