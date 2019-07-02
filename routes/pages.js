let express = require('express');
let router = express.Router();
const path = require('path')

require('dotenv/config')
/**
 * 
 * @param {Response} res 
 * @param {Object} params
 */
function render(view, res)
{
  res.sendFile(path.resolve('dist/'+view+'.html')); 
}

router.get('/', (req, res) => {
  if(req.session.usuario)
    render('session', res)
  else
    render('login', res);
});


module.exports = router;