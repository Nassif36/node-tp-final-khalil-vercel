import express from "express"

const routes = express.Router()

// GET /api/products => devuelve todos los productos
routes.get('/', async (req, res) => {
	try{
		const module = await import('../controllers/product.controllers.js').catch(() => null);
		if (module && module.getAllProducts) {
			return module.getAllProducts(req, res);
		}
		res.status(501).json({ message: 'Not implemented: getAllProducts controller missing' });
	}catch(err){
		res.status(500).json({ error: err.message })
	}
})

// GET /api/products/:id => devuelve producto por id
routes.get('/:id', async (req, res) => {
	try{
		const module = await import('../controllers/product.controllers.js').catch(() => null);
		if (module && module.getProductById) {
			return module.getProductById(req, res);
		}
		res.status(501).json({ message: 'Not implemented: getProductById controller missing' });
	}catch(err){
		res.status(500).json({ error: err.message })
	}
})

// POST /api/products/create => crea un producto
routes.post('/create', async (req, res) => {
	try{
		const module = await import('../controllers/product.controllers.js').catch(() => null);
		if (module && module.addProduct) {
			return module.addProduct(req, res);
		}
		res.status(501).json({ message: 'Not implemented: addProduct controller missing' });
	}catch(err){
		res.status(500).json({ error: err.message })
	}
})

// DELETE /api/products/:id => elimina un producto
routes.delete('/:id', async (req, res) => {
	try{
		const module = await import('../controllers/product.controllers.js').catch(() => null);
		if (module && module.deleteProduct) {
			return module.deleteProduct(req, res);
		}
		res.status(501).json({ message: 'Not implemented: deleteProduct controller missing' });
	}catch(err){
		res.status(500).json({ error: err.message })
	}
})

export default routes;

