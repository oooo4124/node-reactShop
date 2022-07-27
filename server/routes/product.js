const express = require('express');
const router = express.Router();
const multer  = require('multer');
const { Product } = require('../models/Product');


//=================================
//             Product
//=================================

const storage = multer.diskStorage({
    //destination : 파일이 어디에 저장되는지 설명
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        // 파일을 어떤 이름으로 저장할 지 정한다.
      cb(null, `${Date.now()}_${file.originalname}`)
    }
  })
  
  const upload = multer({ storage: storage }).single("file")

router.post('/image', (req, res) => {
    //가져온 이미지 저장
    upload(req, res, err =>{
        if(err){
            return req.json({success:false, err})
        }
        return res.json({success: true, filePath:res.req.file.path , fileName:res.req.file.filename})
    })

})

router.post('/', (req, res) => {
  //받아온 정보들을 DB에 넣어준다
  const product = new Product(req.body)
  console.log(req.body)
  product.save((err) => {
    if(err) return res.status(400).json({success: false, err})
    return res.status(200).json({success: true})
  }) 
})



module.exports = router;