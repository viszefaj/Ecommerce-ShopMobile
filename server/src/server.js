const express = require('express');
const app = express();
const cors = require('cors');
const health = require('./routes/health/index.js');
const rewrite = require('express-urlrewrite');



app.use(express.json());
app.use(cors());


app.use(rewrite('/health', '/healthcheck'));

app.use('/healthcheck', health);



app.listen(3000, () => {
    console.log('Server on port 3000');
});