const express = require('express');
const app = express();
const cors = require('cors');
const health = require('./routes/health/index.js');
const rewrite = require('express-urlrewrite');
const products = require('./routes/products/index.js');
const users = require('./routes/users/index.js');
const admin = require('./routes/admin/index.js');
const deliver = require('./routes/deliver/index.js')




app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));


app.use(rewrite('/health', '/healthcheck'));
app.use(rewrite('/prods', '/products'));
app.use(rewrite('/login', '/main/login'));
app.use(rewrite('/register', '/main/register'));
app.use(rewrite('/contact', '/main/messages'));
app.use(rewrite('/contact', '/main/contact'));
app.use(rewrite('/finish-order', '/main/finish-order'));



app.use('/healthcheck', health);
app.use('/products', products);

app.use('/main', users);

app.use('/deliver', deliver)

app.use('/dashboard', admin)


app.listen(4000, () => {
    console.log('Server listeing on port 4000');
});