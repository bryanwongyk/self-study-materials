var backdrop = document.querySelector('.backdrop');
var modal = document.querySelector('.modal');
var modalNoButton = document.querySelector('.modal__action--negative');
var selectPlanButton = document.querySelectorAll('.plan button');
var toggleButton = document.querySelector('.toggle-button');
var mobileNav = document.querySelector('.mobile-nav');

selectPlanButton.forEach(function(plan){
    plan.addEventListener('click', () => {
        modal.classList.toggle('open');
        backdrop.classList.toggle('open');
    })
});

backdrop.addEventListener('click', function(){
    closeModal();
    mobileNav.classList.remove('open');
});

if (modalNoButton) {
    modalNoButton.addEventListener('click', closeModal);
}

toggleButton.addEventListener('click', function(){
    mobileNav.classList.add('open');
    backdrop.classList.add('open');
});



function closeModal() {
    if (modal){
        modal.classList.remove('open');
    }
    backdrop.classList.remove('open');
}