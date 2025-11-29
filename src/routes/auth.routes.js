import express from "express"

const routes = express.Router()

// POST /auth/login => recibe credenciales y devuelve token
routes.post('/login', async (req, res) => {
	try{
		const module = await import('../controllers/auth.controllers.js').catch(() => null);
		if (module && module.login) {
			return module.login(req, res);
		}
		res.status(501).json({ message: 'Not implemented: login controller missing' });
	}catch(err){
		res.status(500).json({ error: err.message })
	}
})

export default routes;

