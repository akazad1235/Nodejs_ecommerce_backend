import { NextFunction } from 'express';
import CustomError, { DuplicateEmailError } from '../../utils/customErrors';
import BitssPayment from './bitss.payment.model';
import mongoose from 'mongoose';
import BfinitPayment from './bitss.payment.model';
import { IBitssPayment } from './bitss.payment.interface';
import mysql from 'mysql2';
import bcrypt from 'bcrypt';
import https from 'https';





const getAllPaymentIntoDB = async() => {
    return  await BitssPayment.find();
    
}
const createBitssPaymentIntoDB = async(payload: IBitssPayment) => {
  const { email, password, name, user_name, order_id, address, country, software, payment_type,price } = payload;



  const makeEmail = `${user_name}@bobosohomail.com`;

  const payloads = {
    email: makeEmail,
    username: name,
    hasPassword: password,
    name: 'Sample Name',
  };
  const storeDB = {
    order_id: order_id,
    email: makeEmail,
    name: name,
    user_name: user_name,
    address: address,
    country: country,
    software: software,
    payment_type: payment_type,
    price: price
  }


   await createTpAccount(payloads);
   await createBobosohoMail(makeEmail, password);
    
    const newUser = new BitssPayment(storeDB);
    return await newUser.save();
    
}
// show specific user
const showBitssPaymentIntoDB = async(paymentId: string) => {

        const payment = await BitssPayment.findById(paymentId); // Correct the email typo
    
        // If user is not found, throw a custom error
        if (!payment) {
            // User not found, throw a custom error
            throw new CustomError('Payment id not found.', 404);
        }
        return payment;
}

const createTpAccount = async (payload: any) => {
  // return payload;
  // MySQL connection setup
  const connection = mysql.createConnection({
    host: '92.204.53.61',
    user: 'Bobosoho_office',
    password: '1811Geen!',
    database: 'Bobosoho_office',
  });

  // Deconstruct payload for necessary fields
  const { email, username, hasPassword, name } = payload;
  const role = 'Master Email';
  const active_account = 1;

  let hashedPassword = await bcrypt.hash(hasPassword, 10); // Await hash


  try {
    // Connect to the database
    connection.connect((err: Error) => {
      if (err) {
        throw new Error(`Could not connect to MySQL database: ${err.message}`);
      }
      console.log('Connected to MySQL database');
    });

    // Check if the email and username already exist
    const existEmailQueryPensaki = `SELECT * FROM users WHERE email = ? AND username = ?`;

    const [results] = await connection.promise().execute(existEmailQueryPensaki, [email, username]);

    if (results.length > 0) {
      // If the email and username exist, update the password
      const updatePasswordQueryPensaki = `UPDATE users SET password = ? WHERE email = ?`;

      await connection.promise().execute(updatePasswordQueryPensaki, [hashedPassword, email]);
      console.log('Password updated successfully');
    } else {
      // If email and username don't exist, insert a new user
      const insertUserQuery = `INSERT INTO users (name, username, active_account, email, role, password) VALUES (?, ?, ?, ?, ?, ?)`;

      await connection.promise().execute(insertUserQuery, [name, username, active_account, email, role, hashedPassword]);
      console.log('User inserted successfully');
    }
  } catch (error) {
    console.error('Error in createTpAccount:', error.message);
  } finally {
    // Close the connection
    connection.end();
  }
};

const createBobosohoMail = async (email: string, password: string): Promise<any> => {
  const data = JSON.stringify({
    params: [
      '--create',
      email,
      '-mailbox',
      'true',
      '-passwd',
      password,
      '-mbox_quota',
      '1048576',
    ],
  });

  const options = {
    hostname: 'bobosohomail.com',
    port: 8443,
    path: '/api/v2/cli/mail/call',
    method: 'POST',
    headers: {
      'X-Api-Key': '8322d0fd-75a8-417e-9eb0-155ec4df16b5',
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Content-Length': Buffer.byteLength(data),
    },
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        try {
          const parsedData = JSON.parse(responseData);
          resolve(parsedData);
        } catch (error) {
          reject(new Error('Failed to parse response'));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(data);
    req.end();
  });
};

// Example usage
//createBobosohoMail('sample@bobosohomail.com', 'hashedPassword1@a');


export const BitssPaymentService = {
    getAllPaymentIntoDB,
    createBitssPaymentIntoDB,
    showBitssPaymentIntoDB,
    createTpAccount
}