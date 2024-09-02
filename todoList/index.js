import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import exphbs from 'express-handlebars';
import session from 'express-session';
import passport from 'passport';
import usersRoutes from './routes/users';
import todosRoutes from './routes/todos';

const app = express();

app.set('views', path.join(__dirname + '/views'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: 'todos',
    resave: true,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

const port = 8888;

app.listen(port, () => {
    console.log('Listening on port ' + port);
});
app.use('/todos', todosRoutes);
app.use('/', usersRoutes);