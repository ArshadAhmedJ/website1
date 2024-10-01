function toggleMenu() {
    var menu = document.querySelector('.mobile-menu');
    menu.classList.toggle('active');
}
document.addEventListener("DOMContentLoaded", function () {
    gsap.from(".service-card", {
        duration: 1,
        opacity: 0,
        y: 100,
        stagger: 0.2,
        ease: "power3.out"
    });
});
