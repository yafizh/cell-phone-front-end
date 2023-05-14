<template>
    <div class="layout-wrapper layout-content-navbar">
        <div class="layout-container">
            <Sidebar />
            <router-view />
        </div>
        <div class="layout-overlay layout-menu-toggle"></div>
    </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'

export default {
    components: {
        Sidebar,
    },
}
</script>