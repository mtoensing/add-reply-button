<?php
/*
  Plugin Name: Add reply button
  Plugin URI: https://github.com/mtoensing/add-reply-button
  GitHub Plugin URI: mtoensing/add-reply-button
  Description: Adds an additional reply button at the end of each comment thread. 
  Version: 1.0
  Author: Marc Tönsing
  Author URI: http://marc.tv
  License: GPLv2 or later
  License URI: http://www.gnu.org/licenses/gpl-2.0.html
 */

if ( !class_exists( 'AddReplyButton' ) ) {
	class AddReplyButton {

		protected static $version;

		/**
		 * __construct
		 *
		 * @access public
		 * @return void
		 */
		public function __construct() {
			add_action( 'init', array( &$this, 'init' ) );

			// Setting plugin defaults here:
			self::$version = '3.0';

		}

		/**
		 * init function.
		 *
		 * @access public
		 * @return void
		 */
		public function init() {

			if( !is_admin() && !in_array( $GLOBALS['pagenow'], array( 'wp-login.php', 'wp-register.php' ) ) ) {
				add_action( 'wp_print_scripts', array( $this,'add_scripts_frontend' ) );
			}
		}

		public function add_scripts() {
      		wp_enqueue_script( 'add-reply-button', plugins_url( '/add-reply-button.js' ,__FILE__ ), array(), self::$version, 1 );
		}

		/**
		 * add_scripts_frontend function.
		 *
		 * @access public
		 * @return void
		 */
		public function add_scripts_frontend() {

			if ( is_singular() && comments_open() ) {
				$this->add_scripts();
			}
		}
	}
}

//instantiate the class
if ( class_exists( 'AddReplyButton' ) ) {
	new AddReplyButton();
}

?>
