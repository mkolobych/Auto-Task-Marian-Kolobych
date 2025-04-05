import dotenv from 'dotenv';

dotenv.config();

export const creds = {
    email: process.env.EMAIL || '',
    password: process.env.PASSWORD || ''
};