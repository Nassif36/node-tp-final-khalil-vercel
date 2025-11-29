import { generateToken } from '../data/token.js'

// controladora simple de login: valida credenciales estáticas y devuelve Bearer token
export const login = async (req, res) => {
  try{
    const { email, password } = req.body || {}
    if (!email || !password) return res.status(400).json({ message: 'Email y password requeridos' })

    // ejemplo estático: en producción cambia por verificación en DB
    if (email === 'test@gmail.com' && password === '123456') {
      const user = { id: '1', email }
      const token = generateToken(user)
      return res.status(200).json({ token: `Bearer ${token}` })
    }

    return res.status(401).json({ message: 'Credenciales inválidas' })
  }catch(err){
    res.status(500).json({ error: err.message })
  }
}
