

const fun = async () =>{
  
    var x = 0;
    var intervalID = setInterval(function () {
    
        console.log(x)
    
       if (++x === 5) {
          clearInterval(intervalID);

       }
    }, 1000);

}

fun()