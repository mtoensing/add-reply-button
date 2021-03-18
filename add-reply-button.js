    const replybtns = document.querySelectorAll(".comment-list > li .comment-reply");

    const supportsDataset = !! document.body.dataset;

    for (let i = 0; i < replybtns.length; i++) {
        let replybtn = replybtns[i];
        let replybtncp = replybtn.cloneNode(true,true);
        replybtncp.addEventListener( 'touchstart', clickEvent, { passive: true } );
        replybtncp.addEventListener( 'click',      clickEvent );
        let cc = replybtn.parentElement.querySelectorAll('.children .comment-content');

        if( cc.length > 0 ){
            let parentcomment = replybtn.parentElement;
            console.info(parentcomment);
            let lastcc = cc[cc.length - 1];
            lastcc.appendChild(replybtncp);
        }
    }

    /* copied from wp-includes/js/comment-reply.js */

    function clickEvent( event ) {
        var replyLink = this,
            commId    = getDataAttribute( replyLink, 'belowelement'),
            parentId  = getDataAttribute( replyLink, 'commentid' ),
            respondId = getDataAttribute( replyLink, 'respondelement'),
            postId    = getDataAttribute( replyLink, 'postid'),
            follow;

        /*
         * Third party comments systems can hook into this function via the global scope,
         * therefore the click event needs to reference the global scope.
         */
        follow = window.addComment.moveForm(commId, parentId, respondId, postId);
        if ( false === follow ) {
            event.preventDefault();
        }
    }

    function getDataAttribute( element, attribute ) {
        if ( supportsDataset ) {
            return element.dataset[attribute];
        }
        else {
            return element.getAttribute( 'data-' + attribute );
        }
    }
