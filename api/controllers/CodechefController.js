

module.exports.getGrantCode=(req,res)=>{
    if(!req.isAuthenticated())
        {
          return   res.redirect('/login')
        }
   res.redirect('/dashboard');
}


module.exports.getToken = (req,res)=>{

    if(!req.isAuthenticated())
        {
          return   res.redirect('/login')
        }
    console.log(req.body)
}