const cors = require('cors');
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');
const usersRouter = require('./routes/usersRoutes.js');
const authRouter = require('./routes/authRoutes.js');
dotenv.config();
const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
