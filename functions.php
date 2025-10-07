<?php

// Activer la gestion du <title> par WordPress
add_action('after_setup_theme', function () {
    add_theme_support('title-tag');
    add_theme_support('custom-logo');
});

add_action('wp_enqueue_scripts', function () {
    wp_enqueue_style('aka-style', get_template_directory_uri() . '/css/style.css');
});

add_action('wp_enqueue_scripts', function () {
    wp_enqueue_script('fontawesome', 'https://kit.fontawesome.com/6839368886.js', [], null, true);

    $theme_js_path = get_template_directory_uri() . '/js/';

    wp_enqueue_script('theme-index', $theme_js_path . 'index.js', [], null, true);
    wp_enqueue_script('theme-menu', $theme_js_path . 'menu.js', [], null, true);
    wp_enqueue_script('theme-navigation', $theme_js_path . 'navigation.js', [], null, true);
    wp_enqueue_script('theme-about', $theme_js_path . 'about.js', [], null, true);
    wp_enqueue_script('theme-work', $theme_js_path . 'work.js', [], null, true);
    wp_enqueue_script('theme-contact', $theme_js_path . 'contact.js', [], null, true);
    wp_enqueue_script('theme-friendslider', $theme_js_path . 'friendSlider.js', [], null, true);
    wp_enqueue_script('theme-opinionslider', $theme_js_path . 'opinionSlider.js', [], null, true);
});

// CPT pour les projets
add_action('init', function () {
    register_post_type('projet', [
        'labels' => [
            'name'          => 'WORK-Projets',
            'singular_name' => 'Projet',
        ],
        'public'      => true,              // visible en front et admin
        'menu_icon'   => 'dashicons-portfolio', // icône dans le menu admin
        'supports'    => ['title', 'editor', 'thumbnail'], // champs activés
    ]);
});

// Taxonomie pour classer les projets
add_action('init', function () {
    register_taxonomy('projet_cat', ['projet'], [
        'labels' => [
            'name'          => 'Catégories de projets',
            'singular_name' => 'Catégorie de projet',
        ],
        'public'            => true,
        'hierarchical'      => false,
        'show_ui'           => true,
        'show_admin_column' => true,
        'show_in_rest'      => true,
    ]);
});

// Champs ACF pour le CPT "projet"
add_action('acf/init', function () {
    if (!function_exists('acf_add_local_field_group')) return;

    acf_add_local_field_group([
        'key' => 'group_projet_fields',
        'title' => 'Projet - Infos',
        'fields' => [
            [
                'key' => 'field_projet_image',
                'label' => 'Image',
                'name' => 'image',
                'type' => 'image',
                'return_format' => 'id',
                'preview_size'  => 'medium',
            ],
            [
                'key' => 'field_projet_lien',
                'label' => 'Lien',
                'name' => 'lien',
                'type' => 'url',
            ],
            [
                'key' => 'field_projet_client',
                'label' => 'Client',
                'name' => 'client',
                'type' => 'text',
            ],
            [
                'key' => 'field_projet_date',
                'label' => 'Date',
                'name' => 'date',
                'type' => 'date_picker',  // tu peux passer en 'date_picker' si tu veux
            ],
            [
                'key' => 'field_projet_fonction',
                'label' => 'Fonction',
                'name' => 'fonction',
                'type' => 'text',  // ex: "motion design, photographie, montage"
            ],
        ],
        'location' => [[[
            'param' => 'post_type',
            'operator' => '==',
            'value' => 'projet',
        ]]],
        'position' => 'normal',
        'style' => 'default',
        'active' => true,
    ]);
});

// CPT pour les avis
add_action('init', function () {
    register_post_type('avis', [
        'labels' => [
            'name'          => 'Avis',
            'singular_name' => 'Avis',
        ],
        'public'      => true,              // visible en front et admin
        'menu_icon'   => 'dashicons-portfolio', // icône dans le menu admin
        'supports'    => ['title', 'editor', 'thumbnail'], // champs activés
    ]);
});

// Champs ACF pour le CPT "avis"
add_action('acf/init', function () {
    if (!function_exists('acf_add_local_field_group')) return;

    acf_add_local_field_group([
        'key' => 'group_avis_fields',
        'title' => 'Avis - Image',
        'fields' => [
            [
                'key' => 'field_avis_image',
                'label' => 'Image',
                'name' => 'image',
                'type' => 'image',
                'return_format' => 'id',
                'preview_size'  => 'medium',
            ]
        ],
        'location' => [[[
            'param' => 'post_type',
            'operator' => '==',
            'value' => 'avis',
        ]]],
        'position' => 'normal',
        'style' => 'default',
        'active' => true,
    ]);
});

// CPT pour les friends
add_action('init', function () {
    register_post_type('friends', [
        'labels' => [
            'name'          => 'Réseau',
            'singular_name' => 'Réseau',
        ],
        'public'      => true,              // visible en front et admin
        'menu_icon'   => 'dashicons-portfolio', // icône dans le menu admin
        'supports'    => ['title', 'editor', 'thumbnail'], // champs activés
    ]);
});

// Taxonomie pour classer les friends
add_action('init', function () {
    register_taxonomy('friends_cat', ['friends'], [
        'labels' => [
            'name'          => 'Type de réseau',
            'singular_name' => 'Type de réseau',
        ],
        'public'            => true,
        'hierarchical'      => false,
        'show_ui'           => true,
        'show_admin_column' => true,
        'show_in_rest'      => true,
    ]);
});

// Champs ACF pour le CPT "friends"
add_action('acf/init', function () {
    if (!function_exists('acf_add_local_field_group')) return;

    acf_add_local_field_group([
        'key' => 'group_friends_fields',
        'title' => 'Réseau - Infos',
        'fields' => [
            [
                'key' => 'field_friends_image',
                'label' => 'Image',
                'name' => 'image',
                'type' => 'image',
                'return_format' => 'id',
                'preview_size'  => 'medium',
            ],
            [
                'key' => 'field_friends_link',
                'label' => 'Lien',
                'name' => 'link',
                'type' => 'link',
                'return_format' => 'array',
            ],

        ],
        'location' => [[[
            'param' => 'post_type',
            'operator' => '==',
            'value' => 'friends',
        ]]],
        'position' => 'normal',
        'style' => 'default',
        'active' => true,
    ]);
});
