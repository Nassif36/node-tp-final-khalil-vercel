import * as productService from '../services/product.services.js'

export const getAllProducts = async (req, res) => {
  try{
    const products = await productService.getAllProductsService()
    res.status(200).json(products)
  }catch(err){
    res.status(500).json({ error: err.message })
  }
}

export const getProductById = async (req, res) => {
  try{
    const id = req.params.id
    const product = await productService.getProductByIdService(id)
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' })
    res.status(200).json(product)
  }catch(err){
    res.status(500).json({ error: err.message })
  }
}

export const addProduct = async (req, res) => {
  try{
    const product = req.body
    if (!product || !product.title) return res.status(400).json({ message: 'Producto inválido' })
    const newProduct = await productService.addProductService(product)
    res.status(201).json(newProduct)
  }catch(err){
    res.status(500).json({ error: err.message })
  }
}

export const deleteProduct = async (req, res) => {
  try{
    const id = req.params.id
    const ok = await productService.deleteProductService(id)
    if (!ok) return res.status(404).json({ message: 'Producto no encontrado' })
    res.status(200).json({ message: 'Producto eliminado' })
  }catch(err){
    res.status(500).json({ error: err.message })
  }
}

export const editProduct = async (req, res) => {
  try{
    const id = req.params.id
    const product = req.body
    const updated = await productService.editProductService(id, product)
    if (!updated) return res.status(404).json({ message: 'Producto no encontrado' })
    res.status(200).json(updated)
  }catch(err){
    res.status(500).json({ error: err.message })
  }
}
