import { CategoryModel } from "../models/category.model.js";
import { ProductModel } from "../models/product.model.js";

const getAllCategories = (req, res) => {
  const categories = CategoryModel.findAll();
  res.status(200).json({
    success: true,
    message: "Lista de categorías",
    data: categories,
    errors: [],
  });
};

const getCategoryById = (req, res) => {
  try {
    const { id } = req.params;
    const category = CategoryModel.findById(Number(id));

    if (!category) {
      return res.status(404).json({
        success: false,
        message: `Categoría con ID ${id} no encontrada`,
        data: [],
        errors: [],
      });
    }
    res.status(200).json({
      success: true,
      message: "Categoría encontrada correctamente",
      data: category,
      errors: [],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al procesar la búsqueda",
      data: [],
      errors: [],
    });
  }
};

const createCategory = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      success: false,
      message: "El nombre de la categoría es obligatorio",
      data: [],
      errors: [],
    });
  }

  const newCategory = CategoryModel.create({ name });
  res.status(201).json({
    success: true,
    message: "Categoría creada correctamente",
    data: newCategory,
    errors: [],
  });
};

const updateCategory = (req, res) => {
  const { id } = req.params;
  const updatedCategory = CategoryModel.update(Number(id), req.body);

  if (!updatedCategory) {
    return res.status(404).json({
      success: false,
      message: `Categoría con ID ${id} no encontrada`,
      data: [],
      errors: [],
    });
  }
  res.status(200).json({
    success: true,
    message: "Categoría actualizada correctamente",
    data: updatedCategory,
    errors: [],
  });
};

const deleteCategory = (req, res) => {
  try {
    const { id } = req.params;

    const categoryExists = CategoryModel.findById(Number(id));
    if (!categoryExists) {
      return res.status(404).json({
        success: false,
        message: `No se pudo eliminar: Categoría con ID ${id} no encontrada`,
        data: [],
        errors: [],
      });
    }

    const linkedProducts = ProductModel.findByCategoryId(Number(id));
    if (linkedProducts && linkedProducts.length > 0) {
      return res.status(409).json({
        success: false,
        message: "No se puede eliminar la categoría porque tiene al menos un recurso vinculado",
        data: [],
        errors: [],
      });
    }

    const isDeleted = CategoryModel.delete(Number(id));
    res.status(200).json({
      success: true,
      message: "Categoría eliminada correctamente",
      data: [],
      errors: [],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error al intentar eliminar la categoría`,
      data: [],
      errors: [],
    });
  }
};

const getProductsByCategory = (req, res) => {
  try {
    const { id } = req.params;

    const categoryExists = CategoryModel.findById(Number(id));
    if (!categoryExists) {
      return res.status(404).json({
        success: false,
        message: `La categoría con ID ${id} no existe`,
        data: [],
        errors: [],
      });
    }

    const products = ProductModel.findByCategoryId(Number(id));
    res.status(200).json({
      success: true,
      message: `Productos de la categoría: ${categoryExists.name}`,
      data: products,
      errors: [],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al buscar los productos de la categoría",
      data: [],
      errors: [],
    });
  }
};

export {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  getProductsByCategory,
};
