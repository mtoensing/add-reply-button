<?php
/**
 * Plugin Name: Add reply button
 * Plugin URI: https://github.com/mtoensing/add-reply-button
 * GitHub Plugin URI: mtoensing/add-reply-button
 * Description: Adds a WordPress reply link after the last reply of each comment thread.
 * Version: 1.2.0
 * Requires at least: 6.0
 * Author: Marc Tönsing
 * Author URI: https://marc.tv
 * License: GPL-2.0-or-later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 *
 * @package Add_Reply_Button
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Loads the thread link enhancement with WordPress reply handling.
 */
function marctv_add_reply_button_enqueue() {
	if ( ! is_singular() || ! comments_open() || ! get_option( 'thread_comments' ) ) {
		return;
	}

	wp_enqueue_script(
		'add-reply-button',
		plugins_url( 'add-reply-button.js', __FILE__ ),
		array( 'comment-reply' ),
		'1.2.0',
		true
	);
}
add_action( 'wp_enqueue_scripts', 'marctv_add_reply_button_enqueue' );
