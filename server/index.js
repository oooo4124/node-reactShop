const express = require("express"); // express 모듈을 가져온다
const app = express(); // function을 이용해 새로운 express app을 만든다
const port = process.env.PORT || 5000 // 포트 지정
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const config = require("./config/key");
const { auth } = require("./middleware/auth");
const { User } = require("./models/User");
const cors = require('cors')

// application/x-www-form-urlencoded 정보를 분석해서 가져올 수 있게 한다.
app.use(bodyParser.urlencoded({ extended: true }));

// application/json 정보를 분석해서 가져올 수 있게 한다.
app.use(bodyParser.json());

app.use(cookieParser());

app.use("/api/users", require("./routes/users"));
app.use("/api/product", require("./routes/product"));

  

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true, // 오류방지
  })
  .then(() => console.log("MongoDB Connected..")) // 연결이 잘 되었을 경우
  .catch((err) => console.log(err)); // 연결 실패

app.use(cors());

app.use("/uploads", express.static("uploads"));
// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  // All the javascript and css files will be read and served from this folder
  app.use(express.static("client/build"));

  // index.html for all page routes    html or routing and naviagtion
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Server Listening on ${port}`);
});
