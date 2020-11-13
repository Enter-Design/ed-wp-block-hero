<?php
/**
 * Plugin Name:     Ed Block Hero
 * Description:     A Block for Heroes
 * Version:         0.1.0
 * Text Domain:     ed-block-hero
 *
 */

/**
 * Registers all block assets so that they can be enqueued through the block editor
 * in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/applying-styles-with-stylesheets/
 */
function create_block_ed_block_hero_block_init() {
	$dir = dirname( __FILE__ );

	$script_asset_path = "$dir/build/index.asset.php";
	if ( ! file_exists( $script_asset_path ) ) {
		throw new Error(
			'You need to run `npm start` or `npm run build` for the "create-block/ed-block-hero" block first.'
		);
	}
	$index_js     = 'build/index.js';
	$script_asset = require( $script_asset_path );
	wp_register_script(
		'create-block-ed-block-hero-block-editor',
		plugins_url( $index_js, __FILE__ ),
		$script_asset['dependencies'],
		$script_asset['version']
	);
	wp_set_script_translations( 'create-block-ed-block-hero-block-editor', 'ed-block-hero' );

	$editor_css = 'build/index.css';
	wp_register_style(
		'create-block-ed-block-hero-block-editor',
		plugins_url( $editor_css, __FILE__ ),
		array(),
		filemtime( "$dir/$editor_css" )
	);

	$style_css = 'build/style-index.css';
	wp_register_style(
		'create-block-ed-block-hero-block',
		plugins_url( $style_css, __FILE__ ),
		array(),
		filemtime( "$dir/$style_css" )
	);

	register_block_type( 'create-block/ed-block-hero', array(
		'editor_script' => 'create-block-ed-block-hero-block-editor',
		'editor_style'  => 'create-block-ed-block-hero-block-editor',
		'style'         => 'create-block-ed-block-hero-block',
	) );
}
add_action( 'init', 'create_block_ed_block_hero_block_init' );
