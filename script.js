function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

const toggleSwitch = document.getElementById('darkModeToggle');
const body = document.body;
const nav = document.querySelector('nav');

// Check for saved user preference and apply it
document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
        nav.classList.add('dark-mode');
        toggleSwitch.checked = true;
    }
});

// Toggle dark mode and save preference
toggleSwitch.addEventListener('change', function() {
    if (this.checked) {
        body.classList.add('dark-mode');
        nav.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'enabled');
    } else {
        body.classList.remove('dark-mode');
        nav.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'disabled');
    }
});





//cookie

// Function to set a cookie
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); // Convert days to milliseconds
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Function to get a cookie by name
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Function to erase a cookie
function eraseCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999; path=/';
}

// Function to show the cookie consent banner
function showCookieConsentBanner() {
    const banner = document.getElementById('cookieConsentBanner');
    if (banner) {
        banner.style.display = 'flex';
    }
}

// Function to hide the cookie consent banner
function hideCookieConsentBanner() {
    const banner = document.getElementById('cookieConsentBanner');
    if (banner) {
        banner.style.display = 'none';
    }
}

// Check if cookies have been accepted or rejected
document.addEventListener('DOMContentLoaded', function() {
    const cookieConsent = getCookie('cookieConsent');
    if (!cookieConsent) {
        showCookieConsentBanner(); // Show the banner if no consent cookie is found
    } else {
        hideCookieConsentBanner(); // Hide the banner if consent cookie is set
    }

    // Apply dark mode based on cookie
    const darkModePreference = getCookie('darkMode');
    if (darkModePreference === 'enabled') {
        body.classList.add('dark-mode');
        nav.classList.add('dark-mode');
        toggleSwitch.checked = true;
    }

    // Handle Accept and Reject buttons
    document.getElementById('acceptCookies').addEventListener('click', function() {
        setCookie('cookieConsent', 'accepted', 7); // Save for 7 days
        hideCookieConsentBanner();
    });

    document.getElementById('rejectCookies').addEventListener('click', function() {
        setCookie('cookieConsent', 'rejected', 7); // Save for 7 days
        hideCookieConsentBanner();
    });
});

// Toggle dark mode and save preference in cookies
toggleSwitch.addEventListener('change', function() {
    if (this.checked) {
        body.classList.add('dark-mode');
        nav.classList.add('dark-mode');
        setCookie('darkMode', 'enabled', 7); // Save for 7 days
    } else {
        body.classList.remove('dark-mode');
        nav.classList.remove('dark-mode');
        setCookie('darkMode', 'disabled', 7); // Save for 7 days
    }
});
