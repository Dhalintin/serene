const express = require('express');
const app = express();
// const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db')

const userRoute = require('./routes/user.route');
const communityRoute = require('./routes/community.route');
const category_route = require('./routes/category.route')
const video_route = require('./routes/video.route')
const article_route = require('./routes/article.route')

dotenv.config();
connectDB()

// mongoose.connect(process.env.MONGODB_URI);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*')

  if(req.method === 'OPTIONS'){
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
  }

  next();
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1/user', userRoute);
app.use('/api/v1/community', communityRoute);
app.use('/api/v1/category', category_route );
app.use('/api/v1/video', video_route);
app.use('/api/v1/article', article_route)



const port =  process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
