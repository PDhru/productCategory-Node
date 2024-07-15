// const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "/images/uploads");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + file.originalname);
//   },
// });

// const imageUpload = multer({ storage: storage }).fields([{ name: 'catimage', maxCount: 1 }, { name: 'caticon', maxCount: 1 }]);

// module.exports = { imageUpload };
const multer = require("multer");
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/images/uploads')); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const imageUpload = multer({ 
  storage: storage,
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|svg/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only .png, .jpg, .jpeg and .svg format allowed!'));
    }
  },
}).fields([{ name: 'catimage', maxCount: 1 }, { name: 'caticon', maxCount: 1 },{ name: 'productimage', maxCount: 1 }]);

module.exports = { imageUpload };
