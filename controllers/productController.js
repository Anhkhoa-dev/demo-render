const ProductModel = require('../models/productModel');

const productController = {
  // Hàm hiển thị danh sách sản phẩm
  getProducts: async (req, res, next) => {
    try {
      const prods = await ProductModel.find();
      return res.render('product/index', { products: prods });
    } catch (error) {
      return next(error);
    }
  },

  // Hàm hiển thị trang tạo sản phẩm
  getCreateProduct: (req, res) => {
    return res.render('product/create');
  },

  // Hàm xử lý tạo sản phẩm
  postCreateProduct: async (req, res, next) => {
    try {
      const body = req.body;
      const file = req.file;
      const prod = new ProductModel({
        name: body.name,
        price: body.price,
        image: file.filename,
      });
      await prod.save();
      return res.redirect('/product');
    } catch (error) {
      return next(error);
    }
  },

  // Hàm hiển thị trang cập nhật sản phẩm
  getUpdateProduct: async (req, res, next) => {
    try {
      const productId = req.params.id;
      const prods = await ProductModel.findById(productId);
      return res.render('product/update', { product: prods });
    } catch (error) {
      return next(error);
    }
  },

  // Hàm xử lý cập nhật sản phẩm
  postUpdateProduct: async (req, res, next) => {
    try {
      const productId = req.params.id;
      const file = req.file;
      let updatedData = {
        name: req.body.name,
        price: req.body.price,
      };
      if (file) {
        // Nếu người dùng tải lên hình mới, thì cập nhật đường dẫn hình
        updatedData.image = file.filename;
      }
      await ProductModel.findByIdAndUpdate(productId, updatedData);
      return res.redirect('/product');
    } catch (error) {
      return next(error);
    }
  },

  // Hàm xử lý xóa sản phẩm
  postDeleteProduct: async (req, res, next) => {
      const productId = req.params.id;
      await ProductModel.findByIdAndDelete(productId);
      return res.redirect('/product');
  },

  // Hàm tìm kiếm sản phẩm
  searchProduct: async (req, res, next) => {
    try {
      const searchQuery = req.query.q;
      const searchNumber = parseFloat(searchQuery);
      const isNumericSearch = !isNaN(searchNumber);
      let query = {};
      if (isNumericSearch) {
        query = { price: searchNumber };
      } else {
        query = { name: { $regex: searchQuery, $options: 'i' } };
      }
      const prods = await ProductModel.find(query);
      return res.render('product/index', { products: prods, searchQuery: searchQuery });
    } catch (error) {
      return next(error);
    }
  },
};

module.exports = productController;
