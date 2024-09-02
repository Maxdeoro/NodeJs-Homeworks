import express from 'express';
import passport from 'passport';
import User from '../models/user';
import auth from '../passport';
import errorMsg from '../constants/error';

const router = express.Router();

router.get('/', async (req,res) => {
    res.redirect('/login');
});

router.get('/login', async (req,res) => {
    res.render('login');
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/todos',
    failureRedirect: '/login',
}));

router.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));

router.get('/auth/facebook/callback', {
    successRedirect: '/todos',
    failureRedirect: '/login',
});

router.post('/users', async (req,res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.send('User added!');
    } catch (error) {
        console.log(error);
        res.send(errorMsg.GENERIC_ERROR_MESSAGE);
    }
});

export default router;