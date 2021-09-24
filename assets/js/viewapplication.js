{
let deletePost = function(){
      let delele =  $('.delete-user')
    delele.click(function(e){
        e.preventDefault();

        console.log('Clicked on it')

        $.ajax({
            type: 'get',
            url: $('.delete-user').prop('href'),
            success: function(data){
                $(`#rolereq-${data.data.rolereqid}`).remove();
                console.log(data.data.rolereqid)
                new Noty({
                  theme: 'relax',
                  text: "Rejected!",
                  type: 'success',
                  layout: 'centerRight',
                  timeout: 1500
                  
              }).show();

            },error: function(error){
                console.log(error.responseText);
            }
        });

    });
}




let acceptuser = function(){
    let delele =  $('.accept-user')
  delele.click(function(e){
      e.preventDefault();

      console.log('Clicked on it')
     
      $.ajax({
          type: 'get',
          url: $('.accept-user').prop('href'),
          success: function(data){
              $(`#rolereq-${data.data.rolereqid}`).remove();
              console.log(data.data.rolereqid)

              if(data.data.done=="yes")
              {

             
              new Noty({
                theme: 'relax',
                text: "Accepted!",
                type: 'success',
                layout: 'centerRight',
                timeout: 1500
                
            }).show();

            notifier.notify(data.data.username,'Congrats ! welcome on board as a '+ data.data.role,'/dashboard')


        }else{

            new Noty({
                theme: 'relax',
                text: "Only role of students can change",
                type: 'success',
                layout: 'centerRight',
                timeout: 1500
                
            }).show();



        }

          },error: function(error){
            new Noty({
                theme: 'relax',
                text: "Something went wrong",
                type: 'error',
                layout: 'centerRight',
                timeout: 1500
                
            }).show();
              console.log(error.responseText);
          }
      });

  });
}





deletePost()
acceptuser()
}