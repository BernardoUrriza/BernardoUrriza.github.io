document.addEventListener('DOMContentLoaded', () => {
    const sideMenu = document.querySelector('.side-menu');
    const openSideMenu = document.querySelector('.navigation-menu-link');
    const closeSideMenu = document.querySelector('.side-menu--close');

    openSideMenu.addEventListener('click', () => sideMenu.setAttribute('open', ''));
    closeSideMenu.addEventListener('click', () => sideMenu.removeAttribute('open'));
});
