const express = require('express');
const app = express();
const cors = require('cors');
const health = require('./routes/health/index.js');
const rewrite = require('express-urlrewrite');
const products = require('./routes/products/index.js');
const users = require('./routes/users/index.js');




app.use(express.json());
app.use(cors());


app.use(rewrite('/health', '/healthcheck'));
app.use(rewrite('/prods', '/products'));
app.use(rewrite('/login', '/main/login'));
app.use(rewrite('/register', '/main/register'));



app.use('/healthcheck', health);
app.use('/products', products);

app.use('/main', users);



app.listen(3000, () => {
    console.log('Server listeing on port 3000');
});