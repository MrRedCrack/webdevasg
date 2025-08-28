/*!
 * Color mode toggler for Bootstrap's docs (https://getbootstrap.com/)
 * Copyright 2011-2025 The Bootstrap Authors
 * Licensed under the Creative Commons Attribution 3.0 Unported License.
 */

// Code below has been adapted from that provided by Bootstrap docs to work with our website elements.
(() => {
    "use strict";

    const getStoredTheme = () => localStorage.getItem("theme");
    const setStoredTheme = (theme) => localStorage.setItem("theme", theme);

    const getPreferredTheme = () => {
        // retrieve previously stored theme preference
        const storedTheme = getStoredTheme();
        if (storedTheme) {
            return storedTheme;
        }

        // query system if no previously stored theme preference
        return window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
    };

    // Set website theme
    const setTheme = (theme) => {
        if (theme === "auto") {
            document.documentElement.setAttribute(
                "data-bs-theme",
                window.matchMedia("(prefers-color-scheme: dark)").matches
                    ? "dark"
                    : "light"
            );
        } else {
            document.documentElement.setAttribute("data-bs-theme", theme);
        }
    };

    setTheme(getPreferredTheme());

    // reflect current theme on mode switch button (sun/moon/auto icon)
    const showActiveTheme = (theme, focus = false) => {
        const themeSwitcher = document.querySelector("#bd-theme");

        if (!themeSwitcher) {
            return;
        }

        const themeSwitcherText = document.querySelector("#bd-theme-text");
        const activeThemeIcon = document.querySelector(
            ".theme-icon-active use"
        );
        // locate target button to activate by matching theme with data-bs-theme-value attribute
        const btnToActive = document.querySelector(
            `[data-bs-theme-value="${theme}"]`
        );
        const svgOfActiveBtn = btnToActive
            .querySelector("svg use")
            .getAttribute("href");
        const tickOfActiveBtn = btnToActive.querySelector("svg:nth-child(2)");

        // reset buttons appearance
        document
            .querySelectorAll("[data-bs-theme-value]")
            .forEach((element) => {
                element.classList.remove("active");
                element.setAttribute("aria-pressed", "false");
                element
                    .querySelector("svg:nth-child(2)")
                    .classList.add("d-none");
            });

        // set active button appearance
        btnToActive.classList.add("active");
        btnToActive.setAttribute("aria-pressed", "true");
        tickOfActiveBtn.classList.remove("d-none");
        activeThemeIcon.setAttribute("href", svgOfActiveBtn);
        const themeSwitcherLabel = `${themeSwitcherText.textContent} (${btnToActive.dataset.bsThemeValue})`;
        themeSwitcher.setAttribute("aria-label", themeSwitcherLabel);

        if (focus) {
            themeSwitcher.focus();
        }
    };

    // Event listener to update website theme automatically when system theme changes
    window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", () => {
            const storedTheme = getStoredTheme();
            if (storedTheme !== "light" && storedTheme !== "dark") {
                setTheme(getPreferredTheme());
            }
        });

    // Update display of mode switch button upon content load
    window.addEventListener("DOMContentLoaded", () => {
        showActiveTheme(getPreferredTheme());

        // Add event listener for each button in the mode switch dropdown
        document.querySelectorAll("[data-bs-theme-value]").forEach((toggle) => {
            toggle.addEventListener("click", () => {
                const theme = toggle.getAttribute("data-bs-theme-value");
                setStoredTheme(theme);
                setTheme(theme);
                showActiveTheme(theme, true);
            });
        });
    });
})();
