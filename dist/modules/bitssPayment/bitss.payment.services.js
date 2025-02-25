"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customErrors_1 = __importDefault(require("../../utils/customErrors"));
const bitss_payment_model_1 = __importDefault(require("./bitss.payment.model"));
const mysql2_1 = __importDefault(require("mysql2"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const https_1 = __importDefault(require("https"));
const getAllPaymentIntoDB = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield bitss_payment_model_1.default.find();
});
const createBitssPaymentIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, name, user_name, order_id, address, country, software, payment_type, price } = payload;
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
    };
    yield createTpAccount(payloads);
    yield createBobosohoMail(makeEmail, password);
    const newUser = new bitss_payment_model_1.default(storeDB);
    return yield newUser.save();
});
// show specific user
const showBitssPaymentIntoDB = (paymentId) => __awaiter(void 0, void 0, void 0, function* () {
    const payment = yield bitss_payment_model_1.default.findById(paymentId); // Correct the email typo
    // If user is not found, throw a custom error
    if (!payment) {
        // User not found, throw a custom error
        throw new customErrors_1.default('Payment id not found.', 404);
    }
    return payment;
});
const createTpAccount = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // return payload;
    // MySQL connection setup
    const connection = mysql2_1.default.createConnection({
        host: '92.204.53.61',
        user: 'Bobosoho_office',
        password: '1811Geen!',
        database: 'Bobosoho_office',
    });
    // Deconstruct payload for necessary fields
    const { email, username, hasPassword, name } = payload;
    const role = 'Master Email';
    const active_account = 1;
    let hashedPassword = yield bcrypt_1.default.hash(hasPassword, 10); // Await hash
    try {
        // Connect to the database
        connection.connect((err) => {
            if (err) {
                throw new Error(`Could not connect to MySQL database: ${err.message}`);
            }
            console.log('Connected to MySQL database');
        });
        // Check if the email and username already exist
        const existEmailQueryPensaki = `SELECT * FROM users WHERE email = ? AND username = ?`;
        const [results] = yield connection.promise().execute(existEmailQueryPensaki, [email, username]);
        if (results.length > 0) {
            // If the email and username exist, update the password
            const updatePasswordQueryPensaki = `UPDATE users SET password = ? WHERE email = ?`;
            yield connection.promise().execute(updatePasswordQueryPensaki, [hashedPassword, email]);
            console.log('Password updated successfully');
        }
        else {
            // If email and username don't exist, insert a new user
            const insertUserQuery = `INSERT INTO users (name, username, active_account, email, role, password) VALUES (?, ?, ?, ?, ?, ?)`;
            yield connection.promise().execute(insertUserQuery, [name, username, active_account, email, role, hashedPassword]);
            console.log('User inserted successfully');
        }
    }
    catch (error) {
        console.error('Error in createTpAccount:', error.message);
    }
    finally {
        // Close the connection
        connection.end();
    }
});
const createBobosohoMail = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
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
        const req = https_1.default.request(options, (res) => {
            let responseData = '';
            res.on('data', (chunk) => {
                responseData += chunk;
            });
            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(responseData);
                    resolve(parsedData);
                }
                catch (error) {
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
});
// Example usage
//createBobosohoMail('sample@bobosohomail.com', 'hashedPassword1@a');
exports.BitssPaymentService = {
    getAllPaymentIntoDB,
    createBitssPaymentIntoDB,
    showBitssPaymentIntoDB,
    createTpAccount
};
