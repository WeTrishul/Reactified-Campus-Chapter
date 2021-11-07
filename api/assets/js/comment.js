

class PostComments{
    constructor(postId){
        this.postId = postId;
        this.postContainer = $(`#post-${postId}`);
        this.newCommentForm = $(`#post-${postId}-comments-form`);

        this.createComment(postId);

        console.log(postId)

        let self = this;
      
        $('.delete-comment-button', this.postContainer).each(function(){
            self.deleteComment($(this));
        });
    }


    createComment(postId){
        let pSelf = this;
        this.newCommentForm.submit(function(e){
            e.preventDefault();
            let self = this;
            console.log('done')
            $.ajax({
                type: 'post',
                url: '/commentit',
                data: $(self).serialize(),
                success: function(data){
                  
                    let newComment = pSelf.newCommentDom(data.data.comment);
                    $(`#post-comments-${postId}`).append(newComment);
                    pSelf.deleteComment($('.delete-comment-button', newComment));
                    new ToggleLike($(' .toggle-like-button', newComment));
                    new ToggleReport($(' .report-button', newComment));

                    new Noty({
                      theme: 'relax',
                      text: "Comment published!",
                      type: 'success',
                      layout: 'centerRight',
                      timeout: 1500
                      
                  }).show();

                  // console.log(data.data.comment.userid.username)

                  // console.log(data.data.postuser)

                  if(data.data.comment.userid.username!=data.data.postuser)
                  {


                  // const notifier = new Notihandler(data.data.comment.userid.username)
                  let linktonoti = '/Discuss/#comment-'+data.data.comment._id
                  notifier.notify(data.data.postuser,'commented on your post',linktonoti)

                  

                  

                  }

                 
                }, error: function(error){
                    console.log(error.responseText);
                }
            });


        });
    }


    newCommentDom(comment){
     

        return $(` <div id="comment-${ comment._id }">
       
       <div class=" items-center justify-center space-x-2 px-20">
         <div class="block">
           <!-- Subcomment Sample -->
           <div class="flex items-center space-x-2 space-y-2"  >
             <div class="group relative flex flex-shrink-0 self-start cursor-pointer pt-2">
         <img 
          src="${ comment.userid.dp }" alt="" class="h-8 w-8 object-fill rounded-full">
       </div>
             <div class="flex items-center justify-center space-x-2">
               <div class="block">
                 <div class="bg-gray-100 w-auto rounded-xl px-2 pb-2">
                   <div class="font-medium">
                     <a href="/profilepage/${ comment.userid.username }" class="hover:underline text-sm">
                       <small>${ comment.userid.username }</small>
                     </a>
                   </div>
                   <div class="text-xs">
                   ${ comment.commentBody }
                   </div>
                 </div>
                 <div class="flex justify-start items-center text-xs w-full">
                   <div class="font-semibold text-gray-700 px-2 flex items-center justify-center space-x-1">
                    
                     <a class="toggle-like-button hover:underline" data-likes="0" href="/Likehandler/?id=${ comment._id }&type=comment" >
                     ${ comment.likes.length } likes
                     </a>
                   
                                          
                   <small class="self-center">.</small>
                     <a  href="/destroycomment/${ comment._id }" class="delete-comment-button" >
                       <small>Delete</small>
                     </a>
                     <small class="self-center">.</small>
                        <a class="report-button" data-reports="${ comment.report.length }" href="/Reporthandler/?id=${ comment._id }&type=comment"><small class="text-red-700">${ comment.report.length } Report</small></a>
                  
                    
                   </div>
                 </div>
               </div>
              
             </div>
           </div>
        
         </div>
       </div>
       </div>
     </div>`);
    }


    deleteComment(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                  console.log(data.data.comment_id)
                    $(`#comment-${data.data.comment_id}`).remove();
                    // $(`.delete-comment-button`).remove();
                    
                    // $(`#comments-${data.data.comment_id}`).prepend('<h1>Hi</h1>');
                    console.log('yup')
                    new Noty({
                        theme: 'relax',
                        text: "Comment Deleted",
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
}