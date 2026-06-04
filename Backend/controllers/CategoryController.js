import categoryModal from "../models/CategoryModal";

// create category
const createCategory = async (req, res) => {
  try {
    const { name, users } = req.body;

    // Validation
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Category name is required",
      });
    }

    // Check duplicate category 
    const existing = await categoryModal.findOne({ name });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Category already exists",
      });
    }

    //  Create category
    const category = await categoryModal.create({
      name,
      users: users || [], 
      createdBy: req.user.id, 
    });

    // Populate users 
    const populatedCategory = await categoryModal.findById(category._id)
      .populate("users", "name email");

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      category: populatedCategory,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export {createCategory}