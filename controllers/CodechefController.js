

module.exports.getGrantCode=(req,res)=>{
    // code = req.query.code
    //console.log(code)
   res.redirect('/dashboard');
}


module.exports.getToken = (req,res)=>{
    console.log(req.body)
}