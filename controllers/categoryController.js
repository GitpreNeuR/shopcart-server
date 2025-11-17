const Category=require('../models/categoryModel')
const ErrorHandler=require('../utils/ErrorHandler')


// create a new category
exports.createCategory = catchAsyncError(async (req, res, next) => {
    req.body.admin = req.user.id;
    const category = await Category.create(req.body);
    res.status(200).json({
      success: true,
      data: category,
    });
  });

// delete a category
exports.deleteCategory = catchAsyncError(async (req, res, next) => {
    if (!req.params.id) {
      return next(new ErrorHandler('Category Not Found', 400));
    }
    const category = await Category.findById(req.params.id);
    if (!category) {
      return next(new ErrorHandler('Category Not Found', 200));
    }
    
    await Category.remove();
    res.status(200).json({
      success: true,
      message: 'Category deleted',
    });
  });
  