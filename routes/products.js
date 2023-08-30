const express = require('express');
const router = express.Router();
const multer = require('multer');
const productController = require('../controllers/productController');

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/images');
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + '.jpg');
    },
  }),
});

/* GET products listing. */
router.get('/', productController.getProducts);

// Create product
router.get('/create', productController.getCreateProduct);
router.post('/create', upload.single('image'), productController.postCreateProduct);

// Update product
router.get('/update/:id', productController.getUpdateProduct);
router.post('/update/:id', upload.single('image'), productController.postUpdateProduct);

// Delete product
router.post('/delete/:id', productController.postDeleteProduct);

// Search product
router.get('/search', productController.searchProduct);

module.exports = router;
