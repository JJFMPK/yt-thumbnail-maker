<?php
/**
 * Plugin Name: YT Thumbnail Maker
 * Description: A custom WordPress plugin to create YouTube thumbnails using drag-and-drop canvas.
 * Version: 1.0
 * Author: Your Name
 */

add_action('init', function () {
    add_shortcode('yt_thumbnail_maker', 'yt_thumbnail_maker_func');
});

function yt_thumbnail_maker_func() {
    ob_start();
    include plugin_dir_path(__FILE__) . 'templates/editor-page.php';
    return ob_get_clean();
}

// Load Scripts and Styles
add_action('wp_enqueue_scripts', function () {
    if (!is_page()) return;
    wp_enqueue_style('yt-thumbnail-style', plugin_dir_url(__FILE__) . 'assets/css/style.css');
    wp_enqueue_script('yt-thumbnail-script', plugin_dir_url(__FILE__) . 'assets/js/script.js', array(), false, true);
});
