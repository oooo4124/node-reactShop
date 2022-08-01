const express = require("express");
const router = express.Router();
const multer = require("multer");
const { Product } = require("../models/Product");

//=================================
//             Product
//=================================

var storage = multer.diskStorage({
  //destination : 파일이 어디에 저장되는지 설명
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    // 파일을 어떤 이름으로 저장할 지 정한다.
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

var upload = multer({ storage: storage }).single("file");

router.post("/image", (req, res) => {
  //가져온 이미지 저장
  upload(req, res, (err) => {
    if (err) {
      return req.json({ success: false, err });
    }
    return res.json({
      success: true,
      filePath: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

router.post("/", (req, res) => {
  //받아온 정보들을 DB에 넣어준다
  const product = new Product(req.body);
  product.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.post("/products", (req, res) => {
  // product collection에 들어있는 모든 상품정보를 가져온다.

  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;
  let keyword = req.body.searchKeyword;

  let findArgs = {};

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      // 여기서 key는 continent, price 조건

      if (key === "price") {
        findArgs[key] = {
          //$gte mongodb에서 사용 greater than equal
          $gte: req.body.filters[key][0],
          // less than equal
          $lte: req.body.filters[key][1],
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }
  console.log("findArgs", findArgs);

  if (keyword) {
    Product.find(findArgs)
      .find({ title: { $regex: "(?i)" + keyword } })
      .populate("writer") //writer 정보를 이용해서 유저의 모든 정보를 가져온다.
      .skip(skip)
      .limit(limit)
      .exec((err, productInfo) => {
        if (err)
          return res.status(400).json({
            success: false,
            err,
          });
        return res.status(200).json({
          success: true,
          productInfo,
          PostSize: productInfo.length,
        });
      });
  } else {
    Product.find(findArgs)
      .populate("writer") //writer 정보를 이용해서 유저의 모든 정보를 가져온다.
      .skip(skip)
      .limit(limit)
      .exec((err, productInfo) => {
        if (err)
          return res.status(400).json({
            success: false,
            err,
          });
        return res.status(200).json({
          success: true,
          productInfo,
          PostSize: productInfo.length,
        });
      });
  }
});

router.get("/products_by_id", (req, res) => {
  let type = req.query.type;
  let productIds = req.query.id;

  if (type === "array") {
    //id=aaaa,bbbb,ccccc 왔을 때
    //productIds = ['aaaa','bbbb','ccccc'] 이런식으로 바꿔준다.
    let ids = req.query.id.split(",");
    productIds = ids.map((item) => {
      return item;
    });
  } else if (type === "single") {
    Product.findOneAndUpdate(
      { _id: productIds },
      { $inc: { views: 1 } },
      (err, product) => {
        if (err) return res.json({ success: false, err });
      }
    );
  }

  // productId를 이용해서 DB에서 productId와 같은 상품을 가져온다.

  Product.find({ _id: { $in: productIds } })
    .populate("writer")
    .exec((err, product) => {
      if (err) return res.state(400).send(err);
      return res.status(200).send(product);
    });
});

module.exports = router;
