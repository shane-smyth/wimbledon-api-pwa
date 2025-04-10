document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('ss_mobileMenuButton');
    const navMenu = document.querySelector('.ss_navMenu');

    if (mobileMenuButton && navMenu) {
        mobileMenuButton.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    } else {
        console.error("Mobile menu button or navigation menu not found!");
    }
});