<template>
    <div class="layout-wrapper layout-content-navbar">
        <div class="layout-container">
            <Sidebar />
            <router-view @pushToast="pushToast" :toastStatus="toastStatus" />
            <div class="toast-container position-fixed top-0 end-0 p-2" style="z-index: 9;">
                <div v-for="toast in toasts">
                    <div class="toast align-items-center border-0 show" role="alert" aria-live="assertive"
                        aria-atomic="true"
                        :class="{ 'bg-success': toast.status === toastStatus.success, 'bg-danger': toast.status === toastStatus.failed }">
                        <div class="d-flex">
                            <div class="toast-body">
                                {{ toast.message }}
                            </div>
                            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"
                                aria-label="Close"></button>
                        </div>
                    </div>
                </div>
            </div>
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
    data() {
        return {
            toasts: [],
            toastStatus: {
                success: 'success',
                failed: 'failed'
            }
        }
    },
    methods: {
        pushToast(status, message) {
            this.toasts.push({ status, message });
            setTimeout(() => {
                this.toasts.shift();
            }, 5000);

        }
    },
}
</script>