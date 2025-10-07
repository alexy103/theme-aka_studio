<?php get_header(); ?>

<main>
    <section class="home slide">
        <div class="identity">
            <div class="identity__logo">
                <img
                    src="<?= wp_get_attachment_image_url(get_field('home')['main_logo'], 'full') ?>"
                    alt="AKA STUDIO Logo" />
            </div>
            <h1 class="identity__title">
                Studio de création <span class="break">audiovisuelle</span>
            </h1>
        </div>
        <div class="aka__cream--wrapper aka--wrapper">
            <img
                src="<?= wp_get_attachment_image_url(get_field('home')['left_kanji'], 'full') ?>"
                alt="Cream Kanji"
                class="aka aka__cream" />
            <p>CONTACT</p>
        </div>
        <div class="aka__red--wrapper aka--wrapper">
            <img
                src="<?= wp_get_attachment_image_url(get_field('home')['right_kanji'], 'full') ?>"
                alt="Red Kanji"
                class="aka aka__red" />
            <p>WORK</p>
        </div>
    </section>
    <section class="work slide">
        <div class="presentation">
            <h2 class="slideTitle">WORK<span class="red">.</span></h2>

            <?php
            // Récupérer les catégories de la taxonomie 'projet_cat' qui ont au moins 1 post
            $available_cats = get_terms([
                'taxonomy'   => 'projet_cat',
                'hide_empty' => true,
                'orderby'    => 'name', // change en 'id' si tu veux l'ordre de création
                'order'      => 'ASC',
            ]);
            ?>

            <?php if (!is_wp_error($available_cats) && !empty($available_cats)): ?>
                <ul class="workMenu submenu">
                    <?php $first = true; ?>
                    <?php foreach ($available_cats as $term): ?>
                        <li class="workMenu__link <?= $first ? 'submenu__active' : '' ?>">
                            <?= esc_html($term->name); ?>
                        </li>
                        <?php $first = false; ?>
                    <?php endforeach; ?>
                </ul>
            <?php endif; ?>
        </div>

        <?php if (!is_wp_error($available_cats) && !empty($available_cats)): ?>
            <?php $first = true; ?>
            <?php foreach ($available_cats as $term): ?>

                <?php
                $q = new WP_Query([
                    'post_type'      => 'projet',
                    'posts_per_page' => -1,
                    'tax_query'      => [[
                        'taxonomy' => 'projet_cat',
                        'field'    => 'term_id',
                        'terms'    => $term->term_id,
                    ]],
                ]);
                $index = 1;
                ?>

                <?php if ($q->have_posts()): ?>
                    <div class="projects projects--<?= esc_attr($term->slug); ?> <?= $first ? '' : 'hidden'; ?>">
                        <?php while ($q->have_posts()): $q->the_post(); ?>

                            <?php
                            // Champs natifs
                            $title   = get_the_title();
                            $content = get_the_content();

                            // Champs ACF
                            $img_id   = get_field('image');   // return_format = 'id'
                            $link     = get_field('lien');
                            $client   = get_field('client');
                            $date     = get_field('date');    // date_picker
                            $fonction = get_field('fonction');
                            ?>
                            <figure class="project">
                                <figcaption class="project__text">
                                    <p class="title"><?= esc_html($title); ?></p>
                                    <p class="number"><?= $index++ ?></p>
                                </figcaption>
                                <div class="project__image">
                                    <?php if ($img_id): ?>
                                        <?= wp_get_attachment_image(
                                            $img_id,
                                            'large',
                                            false,
                                            [
                                                'class'            => 'thumbnail',
                                                'alt'              => esc_attr($title),
                                                'data-title'       => esc_attr($title),
                                                'data-src'         => esc_url($link),
                                                'data-description' => esc_attr(wp_strip_all_tags($content)),
                                                'data-client'      => esc_attr($client),
                                                'data-fonction'    => esc_attr($fonction),
                                                'data-date'        => esc_attr($date),
                                            ]
                                        ); ?>
                                    <?php endif; ?>
                                </div>
                            </figure>

                        <?php endwhile; ?>
                    </div>

                    <h3 class="category category--<?= esc_attr($term->slug); ?> <?= $first ? '' : 'hidden'; ?>">
                        <span><?= esc_html($term->name); ?></span>
                    </h3>

                    <?php
                    wp_reset_postdata();
                    $first = false; // on ne bascule qu’après avoir effectivement rendu une section
                    ?>
                <?php endif; ?>

            <?php endforeach; ?>
        <?php endif; ?>



        <img
            src="<?= wp_get_attachment_image_url(get_field('work')['contact_kanji'], 'full') ?>"
            alt="Cream Kanji"
            class="aka aka__cream hidden" />
        <img
            src="<?= wp_get_attachment_image_url(get_field('work')['home_kanji'], 'full') ?>"
            alt="Red Kanji"
            class="aka aka__red hidden" />
    </section>
    <section class="about slide">
        <div class="content content--first">
            <img
                src="<?= wp_get_attachment_image_url(get_field('about')['aka'], 'full') ?>"
                alt="AKA STUDIO Main Logo"
                class="content__img" />
            <div>
                <h3 class="content__title"><?= get_field('about')['aka-title'] ?></h3>
                <div class="content__text">
                    <p>
                        <?= get_field('about')['aka-text'] ?>
                    </p>
                </div>
            </div>
        </div>
        <div class="content hidden content--second">
            <figure class="mainOpinion">
                <img src="" alt="" class="mainOpinion__img" />
                <figcaption class="mainOpinion__infos">
                    <h4 class="mainOpinion__title"></h4>
                    <p class="mainOpinion__text"></p>
                </figcaption>
            </figure>
            <div class="content__wrapper">
                <h3 class="content__title">
                    <?php $avis_title = get_field('about')['avis-title']; ?>
                    <?php if (str_contains(get_field('about')['avis-title'], "!")): ?>
                        <?= str_replace('!', '<span class="red">!</span>', $avis_title); ?>
                    <?php else: ?>
                        <?= $avis_title; ?>
                    <?php endif; ?>
                </h3>

                <div class="opinions">
                    <?php
                    $q = new WP_Query([
                        'post_type'      => 'avis',
                        'post_status'    => 'publish',
                        'posts_per_page' => -1,
                        'orderby'        => 'date',
                        'order'          => 'DESC',
                    ]);
                    $i = 0;

                    if ($q->have_posts()):
                        while ($q->have_posts()): $q->the_post();
                            // Classes actives pour le premier item
                            $active_class = ($i != 0) ? ' hidden' : ''; ?>
                            <figure class="opinion<?= $active_class; ?>">
                                <figcaption class="opinion__infos">
                                    <p class="opinion__text">
                                        <?= wp_kses_post(get_the_content()); ?>
                                    </p>
                                </figcaption>
                                <div class="opinionSlider slider">
                                    <i class="fa-solid fa-chevron-left"></i>
                                    <img src="<?= wp_get_attachment_image_url(get_field('image'), 'full') ?>" alt="">
                                    <i class="fa-solid fa-chevron-right"></i>
                                </div>
                                <h4 class="opinion__title"><?= esc_html(get_the_title()); ?></h4>
                            </figure>
                        <?php
                            $i++;
                        endwhile;
                        wp_reset_postdata(); ?>
                    <?php endif; ?>
                </div>

                <div class="desktopOpinions">
                    <?php
                    $q = new WP_Query([
                        'post_type'      => 'avis',
                        'post_status'    => 'publish',
                        'posts_per_page' => -1,
                        'orderby'        => 'date',
                        'order'          => 'DESC',
                    ]);
                    $i = 0;

                    if ($q->have_posts()):
                        while ($q->have_posts()): $q->the_post();
                            // Classes actives pour le premier item
                            $active_class = ($i === 0) ? ' active activeIn' : ''; ?>
                            <figure class="opinion<?= $active_class; ?>">
                                <img src="<?= wp_get_attachment_image_url(get_field('image'), 'full') ?>"
                                    alt="">
                                <figcaption class="opinion__infos">
                                    <h4 class="opinion__title"><?= esc_html(get_the_title()); ?></h4>
                                    <p class="opinion__text"><?= wp_kses_post(get_the_content()); ?></p>
                                </figcaption>
                            </figure>
                        <?php
                            $i++;
                        endwhile;
                        wp_reset_postdata(); ?>
                    <?php endif; ?>
                </div>
            </div>
        </div>
        <div class="content hidden content--friends">
            <h3 class="content__title">
                <?php $friends_title = get_field('about')['friends-title']; ?>
                <?php if (str_contains(get_field('about')['friends-title'], "!")): ?>
                    <?= str_replace('!', '<span class="red">!</span>', $friends_title); ?>
                <?php else: ?>
                    <?= $friends_title; ?>
                <?php endif; ?>
            </h3>
            <p class="content__text">
                <?= get_field('about')['friends-text'] ?>
            </p>
            <?php
            // Réutilise $terms si déjà défini plus haut, sinon on le charge avec les mêmes options
            if (!isset($terms) || is_wp_error($terms)) {
                $terms = get_terms([
                    'taxonomy'   => 'friends_cat',
                    'hide_empty' => true,
                    'orderby'    => 'name',
                    'order'      => 'ASC',
                ]);
            }

            if (!is_wp_error($terms) && !empty($terms)):
                $t_i = 0;
                foreach ($terms as $term):
                    // Premier .friendlist visible, suivants hidden
                    $hidden_class = ($t_i > 0) ? ' hidden' : '';
            ?>
                    <div class="friendlist<?= $hidden_class; ?>">
                        <?php
                        $q = new WP_Query([
                            'post_type'      => 'friends',
                            'post_status'    => 'publish',
                            'posts_per_page' => 3,
                            'orderby'        => 'date',
                            'order'          => 'DESC',
                            'tax_query'      => [[
                                'taxonomy' => 'friends_cat',
                                'field'    => 'term_id',
                                'terms'    => $term->term_id,
                            ]],
                        ]);

                        $i = 0;
                        if ($q->have_posts()):
                            while ($q->have_posts()): $q->the_post();
                                // 1er figure visible, suivants hidden
                                $item_hidden = ($i > 0) ? ' hidden' : '';
                                $link = get_field('link'); // ACF link (return_format: array)
                        ?>
                                <figure class="friend<?= $item_hidden; ?>">
                                    <div class="slider">
                                        <i class="fa-solid fa-chevron-left"></i>

                                        <?php if (!empty($link['url'])): ?>
                                            <a href="<?= esc_url($link['url']); ?>">
                                                <img src="<?= wp_get_attachment_image_url(get_field('image'), 'full'); ?>" alt="">
                                            </a>
                                        <?php else: ?>
                                            <img src="<?= wp_get_attachment_image_url(get_field('image'), 'full'); ?>" alt="">
                                        <?php endif; ?>

                                        <i class="fa-solid fa-chevron-right"></i>
                                    </div>
                                    <figcaption class="friend__description">
                                        <h4 class="name"><?= esc_html(get_the_title()); ?></h4>
                                        <p class="text"><?= wp_kses_post(get_the_content()); ?></p>
                                    </figcaption>
                                </figure>
                        <?php
                                $i++;
                            endwhile;
                            wp_reset_postdata();
                        endif;
                        ?>
                    </div>
            <?php
                    $t_i++;
                endforeach;
            endif;
            ?>


            <?php
            // 1) Un seul get_terms pour TOUT (listes + menu), mêmes options que le menu
            $terms = get_terms([
                'taxonomy'   => 'friends_cat',
                'hide_empty' => true,   // ← CHANGÉ (avant: false)
                'orderby'    => 'name',
                'order'      => 'ASC',  // ← CHANGÉ (avant: DESC)
            ]);

            if (!is_wp_error($terms) && !empty($terms)):
                $t_i = 0;
                foreach ($terms as $term):
                    // Premier bloc visible, suivants masqués (même logique que ton HTML)
                    $hidden_class = ($t_i > 0) ? ' hidden' : '';
            ?>
                    <div class="friendlistDesktop<?= $hidden_class; ?>">
                        <?php
                        $q = new WP_Query([
                            'post_type'      => 'friends',
                            'post_status'    => 'publish',
                            'posts_per_page' => 3,
                            'orderby'        => 'date',
                            'order'          => 'DESC',
                            'tax_query'      => [[
                                'taxonomy' => 'friends_cat',
                                'field'    => 'term_id',
                                'terms'    => $term->term_id,
                            ]],
                        ]);

                        if ($q->have_posts()):
                            while ($q->have_posts()): $q->the_post(); ?>
                                <figure class="friend">
                                    <a href="<?= esc_url(get_field('link')['url']); ?>">
                                        <img src="<?= wp_get_attachment_image_url(get_field('image'), 'full') ?>" alt="">
                                    </a>
                                    <figcaption class="friend__description">
                                        <h4 class="name"><?= esc_html(get_the_title()); ?></h4>
                                        <p class="text"><?= wp_kses_post(get_the_content()); ?></p>
                                    </figcaption>
                                </figure>
                        <?php
                            endwhile;
                            wp_reset_postdata();
                        endif; ?>
                    </div>
            <?php
                    $t_i++;
                endforeach;
            endif;
            ?>

        </div>

        <div class="menus menus--single">
            <?php
            // 2) PAS de 2e get_terms différent : on réutilise l'exact même ordre
            $jobs_terms = $terms; // ← CHANGEMENT: on reprend les mêmes termes/ordre

            if (!is_wp_error($jobs_terms) && !empty($jobs_terms)): ?>
                <ul class="jobs submenu hidden">
                    <?php $first = true; ?>
                    <?php foreach ($jobs_terms as $term): ?>
                        <li class="jobs__link <?= $first ? 'submenu__active' : '' ?>">
                            <p><?= esc_html($term->name); ?></p>
                        </li>
                        <?php $first = false; ?>
                    <?php endforeach; ?>
                </ul>
            <?php endif; ?>
            <ul class="aboutMenu submenu">
                <li class="aboutMenu__link submenu__active">
                    <p>AKA <span class="break">Studio</span></p>
                </li>
                <li class="aboutMenu__link">
                    <p>Avis</p>
                </li>
                <li class="aboutMenu__link">
                    <p>Réseau</p>
                </li>
            </ul>
        </div>

        <?php
        // 2) PAS de 2e get_terms différent : on réutilise l'exact même ordre
        $jobs_terms = $terms; // ← CHANGEMENT: on reprend les mêmes termes/ordre

        if (!is_wp_error($jobs_terms) && !empty($jobs_terms)): ?>
            <ul class="jobsDesktop submenu hidden">
                <?php $first = true; ?>
                <?php foreach ($jobs_terms as $term): ?>
                    <li class="jobsDesktop__link <?= $first ? 'submenu__active' : '' ?>">
                        <p><?= esc_html($term->name); ?></p>
                    </li>
                    <?php $first = false; ?>
                <?php endforeach; ?>
            </ul>
        <?php endif; ?>

        <h2 class="slideTitle">ABOUT<span class="red">.</span></h2>
        <img
            src="<?= wp_get_attachment_image_url(get_field('about')['contact_kanji'], 'full') ?>"
            alt="Cream Kanji"
            class="aka aka__cream hidden" />
        <img
            src="<?= wp_get_attachment_image_url(get_field('about')['work_kanji'], 'full') ?>"
            alt="Red Kanji"
            class="aka aka__red hidden" />
    </section>

    <section class="contact slide">
        <div class="content content--typeform">
            <a href="<?= get_field('contact')['typeform-link'] ?>" target="_blank" class="subtitle">Typeform<span class="red">.</span> </a>
            <p class="text">
                Remplis le formulaire Typeform pour décrire les caractéristiques de
                ton projet et prends rendez-vous en visio ou en face-à-face pour que
                l'on puisse faire connaissance et commencer à travailler sur ton
                projet.
            </p>
        </div>
        <div class="content content--medias hidden">
            <ul class="medias">
                <li class="media">
                    <a href="<?= get_field('contact')['instagram']['link'] ?>">
                        <img
                            src="<?= wp_get_attachment_image_url(get_field('contact')['instagram']['logo'], 'full') ?>"
                            alt="Instagram logo" />
                    </a>
                </li>
                <li class="media">
                    <a href="<?= get_field('contact')['behance']['link'] ?>">
                        <img
                            src="<?= wp_get_attachment_image_url(get_field('contact')['behance']['logo'], 'full') ?>"
                            alt="Behance logo" />
                    </a>
                </li>
                <li class="media">
                    <a href="<?= get_field('contact')['linkedin']['link'] ?>">
                        <img
                            src="<?= wp_get_attachment_image_url(get_field('contact')['linkedin']['logo'], 'full') ?>"
                            alt="Linkedin logo" />
                    </a>
                </li>
            </ul>
            <p class="text">
                Remplis le formulaire Typeform pour décrire les caractéristiques de
                ton projet et prends rendez-vous en visio ou en face-à-face pour que
                l'on puisse faire connaissance et commencer à travailler sur ton
                projet.
            </p>
        </div>
        <div class="content content--form hidden">

            <?= apply_shortcodes('[contact-form-7 id="e2d8497" title="Formulaire de contact 1"]'); ?>


            <script>
                setTimeout(function() {
                    document.querySelectorAll('.content--form form').forEach(function(form) {
                        form.addEventListener('reset', function(e) {
                            e.preventDefault();
                            console.log(document.querySelectorAll('.content--form form'));
                        });
                    });
                }, 500);
            </script>
            <style>
                .content--form form {
                    display: block;
                }

                .wpcf7 form.sent p {
                    animation: fadeOut 0.5s forwards, formHide 0s 0.5s forwards;
                    /* display: none; */
                }

                .wpcf7-form.resetting {
                    /* animation: fadeOut 0.5s forwards, formHide 0s 0.5s forwards; */
                }

                .wpcf7-form.resetting .wpcf7-spinner {
                    visibility: visible !important;
                }

                .wpcf7 form.sent .wpcf7-response-output {
                    opacity: 0;
                    animation: fadeIn 0.5s 0.5s forwards;
                    font-size: 15px;
                    padding: 80px 0 0;
                    margin: 0;
                }

                .wpcf7 .wpcf7-response-output {
                    border: none !important;
                }

                .wpcf7-spinner {
                    transform: translateY(7px);
                }

                @media screen and (min-width: 1440px) {
                    .wpcf7 form.sent .wpcf7-response-output {
                        font-size: 20px;
                        text-align: center;
                    }
                }

                @keyframes formHide {
                    to {
                        display: none;
                    }
                }
            </style>

        </div>
        <div class="contactMenu__wrapper">
            <h2 class="slideTitle">Contact<span class="red">.</span></h2>
            <ul class="contactMenu submenu">
                <li class="contactMenu__link submenu__active">Typeform</li>
                <li class="contactMenu__link">Réseaux sociaux</li>
                <li class="contactMenu__link">Mail</li>
            </ul>
        </div>
        <img
            src="<?= wp_get_attachment_image_url(get_field('contact')['home_kanji'], 'full') ?>"
            alt="Cream Kanji"
            class="aka aka__cream hidden" />
        <img
            src="<?= wp_get_attachment_image_url(get_field('contact')['work_kanji'], 'full') ?>"
            alt="Red Kanji"
            class="aka aka__red hidden" />
    </section>
</main>

<?php get_footer(); ?>