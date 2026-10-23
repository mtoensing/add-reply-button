/**
 * Continue a thread below its replies using the original WordPress reply link.
 */
( function () {
	'use strict';

	function updateThreads() {
		var lists = document.querySelectorAll( '.wp-block-comment-template, .comment-list, .commentlist' );

		lists.forEach( function ( list ) {
			Array.from( list.children ).forEach( function ( thread ) {
				if ( thread.tagName !== 'LI' ) {
					return;
				}

				var children = Array.from( thread.children ).find( function ( child ) {
					return child.tagName === 'OL' || child.tagName === 'UL';
				} );
				var existing = thread.querySelector( '.marctv-thread-reply' );

				if ( ! children || ! children.querySelector( 'li' ) ) {
					if ( existing ) {
						existing.remove();
					}
					return;
				}
				var replies = children.querySelectorAll( 'li' );
				var lastReply = replies[ replies.length - 1 ];
				var content = Array.from( lastReply.querySelectorAll( '.wp-block-comment-content, .comment-content' ) ).find( function ( element ) {
					return element.closest( 'li' ) === lastReply;
				} ) || lastReply;
				if ( existing ) {
					if ( existing.parentNode !== content ) {
						content.appendChild( existing );
					}
					return;
				}

				var original = Array.from( thread.querySelectorAll( '.comment-reply-link, .comment-reply-login' ) ).find( function ( link ) {
					return link.closest( 'li' ) === thread;
				} );
				if ( ! original ) {
					return;
				}

				var wrapper = document.createElement( 'div' );
				var sourceWrapper = original.closest( '.wp-block-comment-reply-link, .reply, .comment-reply' );
				wrapper.className = ( sourceWrapper ? sourceWrapper.className + ' ' : '' ) + 'marctv-thread-reply';
				wrapper.id = 'marctv-thread-reply-' + thread.id;

				var link = original.cloneNode( true );
				link.removeAttribute( 'id' );
				// Keep the original parent ID, but open the form at the thread's end.
				link.setAttribute( 'data-belowelement', wrapper.id );
				wrapper.appendChild( link );
				content.appendChild( wrapper );

				if ( window.addComment && typeof window.addComment.init === 'function' ) {
					window.addComment.init( wrapper );
				}
			} );
		} );
	}

	function ready() {
		updateThreads();
		if ( window.MutationObserver ) {
			var observer = new MutationObserver( updateThreads );
			document.querySelectorAll( '.wp-block-comment-template, .comment-list, .commentlist' ).forEach( function ( list ) {
				observer.observe( list, { childList: true, subtree: true } );
			} );
		}
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', ready );
	} else {
		ready();
	}
}() );
