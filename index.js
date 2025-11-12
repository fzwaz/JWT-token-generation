const jwt = require("jsonwebtoken");
const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
const PORT = 3000;

const users = [];

app.post('/register',async (req,res)=>{
    const {username , password}= req.body;

    if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
    }
    const existingUser = users.find(u=>u.username === username);
    if(existingUser){
        return res.status(400).json({ message: 'Username already exists' });
    }

    const hashPassword = await bcrypt.hash(password,10);

    const newUser = {
        id : users.length + 1,
        username,
        password: hashPassword,
    };

    users.push(newUser);

    res.status(201).json({message:"user registered successfully!"});
});

app.post('/login',async (req,res)=>{
    const {username , password}=req.body;

    const user = users.find(u=>u.username===username);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isValid = await bcrypt.compare(password , user.password);
    if (!isValid) return res.status(401).json({ message: 'Invalid credentials' });

    const payload = {
        id:user.id,
        username:user.username
    }
    const secertkey = process.env.JWT_SECRET;
    const options = {expiresIn :'1h'};

    const token = jwt.sign(payload , secertkey,options);

    res.cookie('authToken',token,{
        httpOnly:true,
        secure:true,
        sameSite:'strict',
    });

    res.json({message:'login successfully!'});
});

app.get('/protected',(req,res)=>{
    const token = req.cookies.authToken;
    if(!token){
        return res.status(401).json({ message: 'No token found' });
    };

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        res.json({message:"Welcome to the protected route!"});
    } catch (error) {
        res.status(401).json({message:"Invalid or expired token"})
    }
});

app.post('/logout',(req,res)=>{
    res.clearCookie('authToken');
    res.json({message:"Logged out successfully!"});
})

app.listen(PORT,()=> console.log(`✅ Server running on http://localhost:${PORT}`))
 
