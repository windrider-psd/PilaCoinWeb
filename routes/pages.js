let express = require('express');
let router = express.Router();
const path = require('path')

function HasSession(req)
{
  return typeof (req.session.user) != 'undefined' && req.session.user != null
}
function HasAdminSession(req)
{
  return HasSession(req) && (req.session.user.admin == true)
}



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
  if(req.session.user)
    render('home', res)
  else
    render('login', res);
});



router.get('/mining_report', (req, res) => {
  if(HasAdminSession(req))
  {
    render('miningcontrol', res);
  }
  else
  {
    render('login', res)
  }
});


router.get('/pila_coin_list', (req, res) => {
  if(HasSession(req))
  {
    render('pilacoinlist', res);
  }
  else
  {
    render('login', res)
  }
});

module.exports = router;