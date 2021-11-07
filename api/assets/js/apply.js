{


    let createPost = function(){

      

        let newPostForm = $('#file-form');


        let _id = $('#userid').val()
        
        newPostForm.submit(function(e){
            e.preventDefault();
            console.log('Hiiiiii')
           

       
            var url = '/applied/'+_id
            $.ajax({
                type: 'post',
                url: url,
                data:newPostForm.serialize() ,
                success: function(data){
                   console.log(data);
                    if(data.data.done==="yes")
                    {

                    
                    new Noty({
                        theme: 'relax',
                        text: "Applied Successfully!",
                        type: 'success',
                        layout: 'centerRight',
                        timeout: 1500
                        
                    }).show();

                    document.getElementById("file-form").reset();

                    console.log(data)

              
                }
                else {
                    new Noty({
                        theme: 'relax',
                        text: "Ekbar apply krke shaanti nhi h ?",
                        type: 'error',
                        layout: 'centerRight',
                        timeout: 1500
                        
                    }).show();
                }
                   
                }, error: function(error){
                    console.log(error.responseText);
                    new Noty({
                        theme: 'relax',
                        text: "Error Occured",
                        type: 'error',
                        layout: 'centerRight',
                        timeout: 1500
                        
                    }).show();
                }
            });
            
        });
    }

    createPost()
}