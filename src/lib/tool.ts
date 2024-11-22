import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import { Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'asad1234';


type ValidationError = {
    msg: string;
};

type PackResponse = {
    status: boolean;
    content: any[];
    validation: any[];
};

const createUuid = (): string => uuidv4();

const createUuid2 = (): string => uuidv4();

const packRes = (status: boolean, content: any[] = [], validation: any[] = []): PackResponse => ({
    status,
    content,
    validation,
});

const dispatchSuc = (res: Response, payload: any, code?: number): void => {
    if (typeof code !== 'undefined') {
        res.statusCode = code;
    }
    res.send(packRes(true, payload));
};

const dispatchErr = (res: Response, err: any, code?: number): void => {
    if (typeof code !== 'undefined') {
        res.statusCode = code;
    }
    res.send(packRes(false, undefined, err));
};

const prepareInput = (input: Record<string, any>): Promise<Record<string, any>> =>
    new Promise((resolve, reject) => {
        const obj: Record<string, any> = {};
        let count = 0;

        for (const key in input) {
            if (Object.prototype.hasOwnProperty.call(input, key) && input[key] !== '') {
                obj[key] = input[key];
                count++;
            }
        }

        count > 0 ? resolve(obj) : reject(['No data passed']);
    });

const cryptPass = (plainPass: string): Promise<string> =>
    new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                reject(err);
                return;
            }
            bcrypt.hash(plainPass, salt, (err, hash) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(hash);
                }
            });
        });
    });

const comparePass = (plainPass: string, userEncPass: string): Promise<void> =>
    new Promise((resolve, reject) => {
        bcrypt.compare(plainPass, userEncPass, (err, isMatch) => {
            if (err) {
                reject(err);
                return;
            }

            if (isMatch) resolve();
            else reject([{ msg: 'Wrong Password' } as ValidationError]);
        });
    });

const hashPass = (password?: string): Promise<string | undefined> =>
    new Promise((resolve, reject) => {
        if (password === undefined) {
            resolve(password);
        } else {
            cryptPass(password)
                .then((encPass) => {
                    resolve(encPass);
                })
                .catch((err) => reject([err]));
        }
    });

// Generate token
const generateToken = (userId: string, companyId: string) => {
    return jwt.sign(
        { userId, companyId }, // Payload
        JWT_SECRET, // Secret key
    );
};

export {
    dispatchSuc,
    dispatchErr,
    prepareInput,
    createUuid,
    createUuid2,
    cryptPass,
    comparePass,
    hashPass,
    generateToken,
};
