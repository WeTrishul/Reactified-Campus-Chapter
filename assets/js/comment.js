

class PostComments{
    // constructor is used to initialize the instance of the class whenever a new instance is created
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
                    $(`#post-comments-${postId}`).prepend(newComment);
                    pSelf.deleteComment($('.delete-comment-button', newComment));

                    // CHANGE :: enable the functionality of the toggle like button on the new comment
                    // new ToggleLike($(' .toggle-like-button', newComment));
                    // new Noty({
                    //     theme: 'relax',
                    //     text: "Comment published!",
                    //     type: 'success',
                    //     layout: 'topRight',
                    //     timeout: 1500
                        
                    // }).show();

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
                     <a href="#" class="hover:underline text-sm">
                       <small>${ comment.userid.username }</small>
                     </a>
                   </div>
                   <div class="text-xs">
                   ${ comment.commentBody }
                   </div>
                 </div>
                 <div class="flex justify-start items-center text-xs w-full">
                   <div class="font-semibold text-gray-700 px-2 flex items-center justify-center space-x-1">
                    
                     <a href="/Likehandler/?id=${ comment._id }&type=Comment" class="hover:underline">
                       <small>Like</small>
                     </a>
                   
                                          
                   <small class="self-center">.</small>
                     <a  href="/destroycomment/${ comment._id }" class="delete-comment-button" >
                       <small>Delete</small>
                     </a>
                     
                   <small class="self-center">.</small>
                       <small>${ comment.likes.length } Likes</small>
                    
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
                    // new Noty({
                    //     theme: 'relax',
                    //     text: "Comment Deleted",
                    //     type: 'success',
                    //     layout: 'topRight',
                    //     timeout: 1500
                        
                    // }).show();
                },error: function(error){
                    console.log(error.responseText);
                }
            });

        });
    }
}