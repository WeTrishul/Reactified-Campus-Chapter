{


    let createPost = function(){

        let newPostForm = $('#file-form');

        const inpfiles = document.getElementById('multiFiles')

        let _id = $('#userid').val()
        
        newPostForm.submit(function(e){
            e.preventDefault();
            
            var form_data = new FormData();
            

            console.log(inpfiles.files)

            for(var f of inpfiles.files)
            {
                form_data.append('questions',f)
            }

            form_data.append('flag',true)

       
            var url = '/fileupload/setquestions/'+_id
            $.ajax({
                type: 'post',
                url: url,
                data: form_data,
                processData:false,
                async: true,
                cache: false,
          contentType:false,
          crossDomain:true,
                success: function(data){
                   console.log(data);
                    if(data.data.done=="yes")
                    {

                    
                    new Noty({
                        theme: 'relax',
                        text: "Question uploaded!",
                        type: 'success',
                        layout: 'centerRight',
                        timeout: 1500
                        
                    }).show();
                }
                else {
                    new Noty({
                        theme: 'relax',
                        text: "Only pdf allowed",
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