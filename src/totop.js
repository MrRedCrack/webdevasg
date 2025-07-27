let buttonToTop = document.querySelector("#btn-back-to-top");

// Show button after 20px from the top of the document
window.onscroll = function () {
    if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
    ) {
        buttonToTop.classList.remove("d-none");
    } else {
        buttonToTop.classList.add("d-none");
    }
};

buttonToTop.addEventListener("click", backToTop);

function backToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
