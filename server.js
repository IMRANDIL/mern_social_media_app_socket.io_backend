require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan')

const cors = require('cors');

const mongoose = require('mongoose');
const errorHandler = require('./middlewares/errorMiddleware')

const app = express()


//middlewares....
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(helmet());

app.use(morgan('common'))


//router middleware...
app.use('/auth', require('./routes/auth'))

app.use('/api/users', require('./routes/users'))







//error handler middleware...


app.use(errorHandler)







const PORT = process.env.PORT || 3000;


mongoose.connect(process.env.URI).then(() => {
    console.log(`Db connected😄`);
    app.listen(PORT, () => {
        console.log(`server runs on port: ${PORT} 😃`);
    })
}).catch((err) => {
    console.log(err.message);
    process.exit(1)
})





