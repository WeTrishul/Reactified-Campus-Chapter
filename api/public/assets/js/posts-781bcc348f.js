{let e=function(){let e=$("#new-post-form");e.submit((function(s){s.preventDefault(),$.ajax({type:"post",url:"/postit",data:e.serialize(),success:function(e){let s=t(e.data.post);$("#posts-list-container").prepend(s),n($(".delete-post-button",s)),console.log("doind"),new PostComments(e.data.post._id),new Noty({theme:"relax",text:"Post published!",type:"success",layout:"centerRight",timeout:1500}).show(),new ToggleLike($(" .toggle-like-button",s))},error:function(e){console.log(e.responseText)}})}))},t=function(e){return console.log(e.id),$(`<div id="post-${e._id}">\n        <div class=" bg-gray-200 shadow-lg rounded-lg  md:max-w-2xl ">\x3c!--horizantil margin is just for display--\x3e\n            <div class="flex items-start px-4 py-6">\n               <img class="w-12 h-12 rounded-full object-cover mr-4 shadow" src="${e.userid.dp}" alt="avatar">\n               <div class="">\n                  <div class="flex items-center justify-between">\n                     <h2 class="text-lg font-semibold text-gray-900 -mt-1">${e.userid.username} </h2>\n                    \n                  </div>\n                  <p class="mt-3 text-gray-700 text-sm">\n                  ${e.postBody}\n                  </p>\n                  \n                  <div class="mt-4 flex items-center">\n                  \n                      \n                    <a class="toggle-like-button" data-likes="0" href="/Likehandler/?id=${e._id}&type=post" class='toggle-like-button'>\n                     \n                        \n                    ${e.likes.length} likes\n                    </a>\n                    \n                     <div class="flex mr-2 text-gray-700 text-sm mr-8">\n                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-4 h-4 mr-1" stroke="currentColor">\n                           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"/>\n                        </svg>\n                        <span>${e.comments.length}</span>\n                     </div>\n                    \n                     <a class="delete-post-button" href="/destroypost/${e._id}">\n                     <div class="flex mr-2 text-gray-700 text-sm mr-4">\n                      \n                         <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">\n                          <path fill-rule="evenodd" d="M6.707 4.879A3 3 0 018.828 4H15a3 3 0 013 3v6a3 3 0 01-3 3H8.828a3 3 0 01-2.12-.879l-4.415-4.414a1 1 0 010-1.414l4.414-4.414zm4 2.414a1 1 0 00-1.414 1.414L10.586 10l-1.293 1.293a1 1 0 101.414 1.414L12 11.414l1.293 1.293a1 1 0 001.414-1.414L13.414 10l1.293-1.293a1 1 0 00-1.414-1.414L12 8.586l-1.293-1.293z" clip-rule="evenodd" />\n                        </svg>\n                        <span>Delete</span>\n                     </div>\n                    </a>\n  \n                  </div>\n               </div>\n            </div>\n         </div>\n         <br>\n         \n         <div class="post-comments">\n\n         <div class="post-comments-list">\n          <div id="post-comments-${e._id}">\n          \n        \n      </div>\n    </div>\n\n        <br>\n        <div class="">\n        <form id="post-${e._id}-comments-form" action="/commentit" method="POST">\n          <input name="commentBody" placeholder="Comment here" class="bg-gray-300 w-auto rounded-xl px-2 p-2">\n          <input name="postid" type="hidden" value="${e._id}"> \n          <button class="bg-green-200 rounded-xl p-2" type="submit" id="send-message">Post</button>\n        </form>\n      </div>\n    </div>\n      <br>\n      </div>`)},n=function(e){$(e).click((function(t){t.preventDefault(),console.log("happened"),$.ajax({type:"get",url:$(e).prop("href"),success:function(e){$(`#post-${e.data.post_id}`).remove(),new Noty({theme:"relax",text:"Post deleted!",type:"success",layout:"centerRight",timeout:1500}).show()},error:function(e){console.log(e.responseText)}})}))},s=function(){$("#posts-list-container>div").each((function(){let e=$(this),t=$(" .delete-post-button",e);n(t);let s=e.prop("id").split("-")[1];console.log(s),new PostComments(s)}))};e(),s()}