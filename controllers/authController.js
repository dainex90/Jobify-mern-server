import { error } from 'console';
import User from '../models/user.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, NotFoundError } from '../errors/index.js';


const register = async (req, res) => {
    const {name, email, password} = req.body;
    if (!name || !email || !password) {
        throw new BadRequestError('All fields must be signed');
    }

    const userAlreadyExists = await User.findOne({email});
    if (userAlreadyExists) {
        throw new BadRequestError('Email already in use');
    }
    const user = await User.create({name, email, password});
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json(
                {
                    user:
                    {
                        email:user.email, 
                        lastName: user.lastName,
                        location: user.location,
                        name: user.name,
                    },
                    token,
                    location: user.location
                }
        );
}

const login = (req, res) => {
    res.send('login user');
}

const updateUser = (req, res) => {
    res.send('updateuser');
}

export { register, login, updateUser }