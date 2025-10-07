<!DOCTYPE html>
<html <?php language_attributes(); ?>>

<head>
    <meta charset="<?= bloginfo('charset'); ?>" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <?php wp_head(); ?>
</head>

<body>
    <header>
        <nav class="menu unclickable front">
            <div class="menu__border"></div>
            <div class="mainColumn">
                <div class="menu__square"></div>
                <div class="menu__home menu__link menu__square activeLink">
                    <h2>Home</h2>
                </div>
                <div class="menu__work menu__link menu__square">
                    <h2>Work</h2>
                </div>
                <div class="menu__about menu__link menu__square">
                    <h2>About</h2>
                </div>
                <div class="menu__contact menu__link menu__square">
                    <h2>Contact</h2>
                </div>
                <div class="menu__square"></div>
            </div>
            <div class="menu__border"></div>
            <div class="thirdcol">
                <span class="menu__close">x</span>
                <p class="menu__text">MENU</p>
                <img
                    class="menu__img"
                    src="<?= wp_get_attachment_image_url(get_field('navigation')['burger_menu_logo'], 'full') ?>"
                    alt="AKA STUDIO Logo Mark" />
            </div>
        </nav>

        <nav class="navigation">
            <img
                src="<?= wp_get_attachment_image_url(get_field('navigation')['mobile_navbar_logo'], 'full') ?>"
                alt="AKA STUDIO Logo Mark"
                class="navigation__logo" />
            <i class="fa-solid fa-bars navigation__burger"></i>
        </nav>

        <nav class="desktopNavigation submenu front">
            <img
                src="<?= wp_get_attachment_image_url(get_field('navigation')['desktop_navbar_logo'], 'full') ?>"
                alt="AKA Studio"
                class="desktopNavigation__img" />
            <ul class="desktopNavigation__links">
                <li class="desktopNavigation__link desktopNavigation__link--home submenu__active active">Home</li>
                <li class="desktopNavigation__link desktopNavigation__link--work">Work</li>
                <li class="desktopNavigation__link desktopNavigation__link--about">About</li>
                <li class="desktopNavigation__link desktopNavigation__link--contact">Contact</li>
                <div class="underline" id="underline"></div>
            </ul>
        </nav>

        <div class="black unclickable">
            <span class="black__close">x</span>
            <figure class="video">
                <h4 class="title">Égérie Fitness Park Rémy</h4>
                <div class="iframe__wrapper">
                    <iframe
                        src=""
                        title=""
                        allow="clipboard-write; picture-in-picture"
                        referrerpolicy="strict-origin-when-cross-origin"
                        allowfullscreen></iframe>
                </div>
                <figcaption class="video__description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit...
                </figcaption>
            </figure>
            <div class="infos">
                <div class="infos__wrapper">
                    <div class="info">
                        <p class="info__title">Client :</p>
                        <p class="info__text">Rémy Dasilva Novais</p>
                    </div>
                    <div class="info">
                        <p class="info__title">Date :</p>
                        <p class="info__text">02 juillet 2024</p>
                    </div>
                </div>
                <div class="info info--fonction">
                    <p class="info__title">Fonction :</p>
                    <p class="info__text">réalisation, captation, montage, étalonnage, motion design</p>
                </div>
            </div>
        </div>
    </header>