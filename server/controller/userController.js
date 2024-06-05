import userModel from "../model/userModel.js";
import { hash, compare } from 'bcrypt';
import walletModel from "../model/walletModel.js";
import categoryModel from "../model/categoryModel.js";
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
    try {
        console.log('In signup controller')
        let userData = req.body;
        console.log(userData)
        if (userData) {
            let findUser = await userModel.findOne({ email: userData.email });
            if (findUser) {
                return res.status(409).json({ success: false, message: 'User already exists!' });
            } else {
                let hashedPassword = await hash(userData.password, 10);
                console.log(hashedPassword)
                userData.password = hashedPassword;

                let newUser = new userModel(userData);

                await newUser.save();
                console.log(newUser)
                let token = jwt.sign({ Id: newUser._id, Name: newUser.name }, process.env.JWT_SECRET, { expiresIn: '30d' });
                res.status(200).json({ success: true, token });
            }
        } else {
            res.status(401).json({ success: false, message: 'Check your credentials!' })
        }
    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
}

export const login = async (req, res) => {
    try {
        console.log('in login controller')
        let { email, password } = req.body;
        if (!email | !password) {
            res.status(401).json({ success: false, message: 'Check your credentials!' });
        } else {
            let findUser = await userModel.findOne({ email: email });
            if (findUser) {
                let checkPassword = await compare(password, findUser.password);
                if (checkPassword) {
                    let token = jwt.sign({ Id: findUser._id, Name: findUser.name }, process.env.JWT_SECRET, { expiresIn: '30d' });
                    console.log(token)
                    res.status(200).json({ success: true, token });
                } else {
                    res.status(401).json({ success: false, message: 'Incorrect password!' });
                }
            } else {
                res.status(401).json({ success: false, message: 'User not found!' })
            }
        }
    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal server error!' })
    }
}

export const addTransaction = async (req, res) => {
    try {
        console.log('in add transaction controller')
        let { amount, category,type,date } = req.body;
        let userId = req.userId;
        console.log(amount,category,userId,date)
        if(type=='expense'){
            amount = -amount
        }
        let transction = {
            date: date,
            amount: amount,
            category: category
        }
        console.log(transction)

        await walletModel.findOneAndUpdate({ userId: userId }, { $inc: { balance: amount }, $push: { transaction: transction } }, { new: true, upsert: true });
        res.status(200).json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal server error!' });
    }
}

export const getWallet = async (req, res) => {
    try {
        let userId = req.userId;
        let wallet = await walletModel.findOne({ userId: userId }).populate('transaction.category');
        console.log(wallet)
        res.status(200).json({ success: true, wallet });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal server error!' });
    }
}

export const addCategory = async (req, res) => {
    try {
        console.log('reached here')
        let data = req.body;
        let image = req.file.filename;
        console.log(data)
        data.image = image;
        let newCategory = new categoryModel(data);
        await newCategory.save();
        res.status(200).json({ success: true });
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: 'Internal server error!' });
    }
}

export const getCategories = async (req, res) => {
    try {
        let type = req.params.type;
        console.log('type..', type);
        let categories = await categoryModel.find({ type: type });
        res.status(200).json({ success: true, categories });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: 'Internal server error!' });
    }
}