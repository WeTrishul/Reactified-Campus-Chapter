{


    let createPost = function(){

      

        let newPostForm = $('#file-form');

        const inpfiles = document.getElementById('multiFiles')

        let _id = $('#userid').val()
        
        newPostForm.submit(function(e){
            e.preventDefault();
            console.log('Hiiiiii')
            var form_data = new FormData();
            

            console.log(inpfiles.files)

            for(var f of inpfiles.files)
            {
                form_data.append('eventbanner',f)
            }

            form_data.append('flag',true)

            console.log($('#a').val())
            form_data.append('eventname',$('#a').val())
            form_data.append('aboutevent',$('#b').val())
            form_data.append('eventStartTime',$('#c').val())
            form_data.append('eventEndTime',$('#d').val())
            form_data.append('eventDate',$('#e').val())
       
            var url = '/CreateEvent'
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
                        text: "Event added!",
                        type: 'success',
                        layout: 'centerRight',
                        timeout: 1500
                        
                    }).show();

                    document.getElementById("file-form").reset();

                    console.log(data)

                    let linktonoti = '/UpcomingEvents/#event-'+data.data.eventid
                    let notimsg = 'Event : ' + data.data.eventname + ' on ' + data.data.eventdate
                    notifier.notify(undefined,notimsg,linktonoti)
                }
                else {
                    new Noty({
                        theme: 'relax',
                        text: "Only image allowed",
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