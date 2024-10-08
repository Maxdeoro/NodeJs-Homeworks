import passport from 'passport';
// const LocalStrategy = require('passport-local').Strategy;
import LocalStrategy from 'passport-local';
import FacebookStrategy from 'passport-facebook';
import User from './models/user';
import config from './config/fb';

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
}, function(username,password,done) {
    User.findOne({email: username}, function(err,user) {
        if(err) {
            throw new Error(err);
        }
        return err 
            ? done(err) 
            : user
                ? password === user.password 
                    ? done(null, user) 
                    : done(null,false, {message: 'Incorrect password.'})
                : done(null,false, {message: 'Incorrect username.'})
    });
}));

const fbOptions = {
    clientID: config.CLIENT_ID,
    clientSecret: config.CLIENT_SECRET,
    callbackURL: config.CALLBACK_URL,
    profileFields: config.PROFILE_FIELDS,
};

passport.use(new FacebookStrategy(fbOptions,
    async function(accessToken,refreshToken,profile,cb) {
        const user = await User.findOrCreate('facebook', {
            facebookId: profile.id,
            email: profile.emails[0].value,
        });
        return cb(null, user);
    }
));

passport.serializeUser(function(user,done) {
    done(null, user.id);
});

passport.deserializeUser(function(user,done) {
    done(null, user);
});

const auth = function(req,res,next) {
    if(!req.isAuthenticated()) {
        res.sendStatus(401);
    } else {
        next();
    }
};

export default auth;