<template>
    <nav class="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
        id="layout-navbar">
        <div class="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
            <a class="nav-item nav-link px-0 me-xl-4" href="javascript:void(0)">
                <i class="bx bx-menu bx-sm"></i>
            </a>
        </div>

        <div class="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
            <slot></slot>

            <ul class="navbar-nav flex-row align-items-center ms-auto">
                <li class="nav-item navbar-dropdown dropdown-user dropdown">
                    <a class="nav-link dropdown-toggle hide-arrow" href="javascript:void(0);" data-bs-toggle="dropdown">
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end">
                        <li>
                            <a class="dropdown-item" href="#">
                                <i class="bx bx-cog me-2"></i>
                                <span class="align-middle">Data Source</span>
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </nav>
</template>
<script>
export default {
    mounted() {
        // Initialize menu togglers and bind click on each
        let menuToggler = document.querySelectorAll('.layout-menu-toggle');
        menuToggler.forEach(item => {
            item.addEventListener('click', event => {
                event.preventDefault();
                window.Helpers.toggleCollapsed();
            });
        });

        // Display menu toggle (layout-menu-toggle) on hover with delay
        let delay = function (elem, callback) {
            let timeout = null;
            elem.onmouseenter = function () {
                // Set timeout to be a timer which will invoke callback after 300ms (not for small screen)
                if (!Helpers.isSmallScreen()) {
                    timeout = setTimeout(callback, 300);
                } else {
                    timeout = setTimeout(callback, 0);
                }
            };

            elem.onmouseleave = function () {
                // Clear any timers set to timeout
                document.querySelector('.layout-menu-toggle').classList.remove('d-block');
                clearTimeout(timeout);
            };
        };

        if (document.getElementById('layout-menu')) {
            delay(document.getElementById('layout-menu'), function () {
                // not for small screen
                if (!Helpers.isSmallScreen()) {
                    document.querySelector('.layout-menu-toggle').classList.add('d-block');
                }
            });
        }
    }
}
</script>