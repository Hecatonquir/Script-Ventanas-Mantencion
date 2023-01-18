const { Router } = require('express');
const { MyGoogle } = require('../functions/google');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers

router.post('/', MyGoogle);
module.exports = router;
