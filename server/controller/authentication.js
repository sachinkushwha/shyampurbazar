const User = require('../model/user');
const DeliveryPartnerDB = require('../model/DeliveryPartnerAccount');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { default: mongoose } = require('mongoose');


exports.Login = async (req, res) => {
    const { email, password } = req.body;
    let user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({ message: "user not found", status: false });
    }

    const ispassword = await bcrypt.compare(password, user.password);
    if (ispassword) {
        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            process.env.jwt_SECRET

        );
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({
            message: "login successful",
            status: true,
            userid: user._id,
            username: user.name,
            token,
            role: user.role,
            number: user.Mbnumber,
            address: user.address
        });
    } else {
        res.status(401).json({
            message: "check your email or password",
            status: false,
        })
    }

}

exports.LoginDeliveryPartner = async (req, res) => {
    const { email, password } = req.body;
    let user = await DeliveryPartnerDB.findOne({ email });

    if (!user) {
        return res.status(404).json({ message: "user not found", status: false });
    }

    const ispassword = await bcrypt.compare(password, user.password);
    if (ispassword) {
        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role, username: user.name },
            process.env.jwt_SECRET

        );
        res.cookie('deliveryPartnerToken', token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        });

        res.status(200).json({
            message: "login successful",
            status: true,
            userid: user._id,
            token,
            role: user.role,
            number: user.Mbnumber,
        });
    } else {
        res.status(401).json({
            message: "check your email or password",
            status: false,
        })
    }

}

exports.SignupDeliveryPartner = async (req, res) => {
    try {
        const { name, email, number, password } = req.body;
        const user = await DeliveryPartnerDB.findOne({ email });
        if (user) {
            return res.status(409).json({ message: "user already exists", status: false });
        }
        const incryptpassword = await bcrypt.hash(password, 10);
        const newuser = new DeliveryPartnerDB({ name, email, Mbnumber: number, password: incryptpassword });
        await newuser.save();
        res.status(200).json({ message: "registration successfull", status: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'internal server error' });
    }
}

exports.Signup = async (req, res) => {

    try {
        let { name, email, number, password } = req.body;
        email = email.trim().toLowerCase();
        const user = await User.findOne({ email });
        if (user) {
            return res.status(409).json({ message: "Email already registered", status: false });
        }
        const incryptpassword = await bcrypt.hash(password, 10);
        const newuser = new User({ name, email, Mbnumber: number, password: incryptpassword });
        await newuser.save();
        res.status(200).json({ message: "registration successfull", status: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'internal server error' });
    }
}

exports.BecomeSeller = async (req, res) => {
    const { name, role } = req.body;
    const isuser = await User.exists(new mongoose.Types.ObjectId(req.user.id));
    if (name && role === 'seller', isuser) {
        const user = await User.findOneAndUpdate(new mongoose.Types.ObjectId(req.user.id),
            {
                'role': role,
                'storeName': name,
                'storeImage': req.file?.path || ""
            },
            { new: true, runValidators: true });
        return res.status(200).json({ message: "congratulation your are now a seller ", userrole: user.role });
    }
    return res.status(500).json({ message: "kuch to garbad hai bhai" });
}

exports.AddAdress = async (req, res) => {
    const updated = await User.findByIdAndUpdate(req.user.id, {
        $push: {
            address: req.body
        }
    },
        { new: true }
    )
    res.status(200).json({ message: 'address add successfuly' });
}

exports.getAddress = async (req, res) => {
    const userAddress = await User.findOne({ _id: req.user.id }, { address: 1, _id: 0 });
    const address = userAddress.address;
    res.status(200).json({ address });
}

exports.Logout = (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: true,
        sameSite: "none",
    });
    return res.status(200).json({ message: 'Logout Successful' });
}
exports.DeliveryPartnerLogout = (req, res) => {
    res.clearCookie('deliveryPartnerToken', {
        httpOnly: true,
        secure: true,
        sameSite: "none"
    });
    return res.status(200).json({ message: 'Logout Successful' });
}