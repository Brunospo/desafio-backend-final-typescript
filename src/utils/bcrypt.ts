import bcrypt from "bcrypt"

export const encryptPassword = (password: string) => bcrypt.hash(password, 10);
export const isCorrectPassword = (password: string, encryptedPassword: string) => bcrypt.compare(password, encryptedPassword);