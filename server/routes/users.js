const express = require("express");
const router = express.Router();
const { User } = require("../models/User");

const { auth } = require("../middleware/auth");

//=================================
//             User
//=================================

router.get("/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

router.post("/register", (req, res) => {
  const user = new User(req.body);

  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.json({
        loginSuccess: false,
        message: "Auth failed, email not found",
      });

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({ loginSuccess: false, message: "Wrong password" });

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie("w_authExp", user.tokenExp);
        res.cookie("w_auth", user.token).status(200).json({
          loginSuccess: true,
          userId: user._id,
        });
      });
    });
  });
});

router.get("/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true,
    });
  });
});

router.post("/addToCart", auth, (req, res) => {
  // User Collection에 해당 유저의 정보를 가져온다.
  // req.user._id 가져올 수 있는 이유는 auth를 통해 토큰을 이용해 유저 정보를 가져올 수 있다.
  User.findOne({ _id: req.user._id },
    (err, userInfo) => {
      // 가져온 정보에 카트에 넣는 상품이 이미 들어있는지 확인
      let duplicate = false;

      userInfo.cart.forEach((item) => {
        if (item.id === req.body.productId) {
          duplicate = true;
        }
      });

      //상품이 이미 있다면
      if (duplicate) {
        User.findOneAndUpdate(
          { _id: req.user._id, "cart.id": req.body.productId },
          { $inc: { "cart.$.quantity": 1 } },
          { new: true }, // 업데이트 된 정보의 결과값을 받을 때 {new : true} 옵션을 줘야한다.
          (err, userInfo) => {
            if (err) return res.status(400).json({ success: false, err });
            res.status(200).send(userInfo.cart);
          }
        );
      }
      //상품이 있지 않을 때
      else {
        User.findOneAndUpdate(
          { _id: req.user._id },
          {
            $push: {
              cart: {
                id: req.body.productId,
                quantity: 1,
                date: Date.now(),
              },
            },
          },
          { new: true },
          (err, userInfo) => {
            if (err) return res.status(400).json({ success: false, err });
            res.status(200).send(userInfo.cart);
          }
        );
      }
    });
});

module.exports = router;
