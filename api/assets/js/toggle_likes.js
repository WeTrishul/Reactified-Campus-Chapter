// CHANGE :: create a class to toggle likes when a link is clicked, using AJAX
class ToggleLike{
    constructor(toggleElement){
        this.toggler = toggleElement;
        this.toggleLike();
    }


    toggleLike(){
        $(this.toggler).click(function(e){
            e.preventDefault();
            let self = this;
            
            // this is a new way of writing ajax which you might've studied, it looks like the same as promises
            $.ajax({
                type: 'POST',
                url: $(self).attr('href'),
            })
            .done(function(data) {
                let likesCount = parseInt($(self).attr('data-likes'));
                console.log(likesCount);
                if (data.data.deleted == true){
                    likesCount -= 1;
                    
                }else{
                    likesCount += 1;
                }

                console.log(data)

                $(self).attr('data-likes', likesCount);
                
                $(self).html(`${likesCount} likes`);

                if(data.data.deleted==false && notifier.notifieruser!=data.data.likeableowner)
                {
                
                notifier.notify(data.data.likeableowner,'liked your ' + data.data.likeabletype,data.data.likeabletype)
                }

            })
            .fail(function(errData) {
                console.log('Error aaya');
            });
            

        });
    }
}