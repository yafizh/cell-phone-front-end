<template>
    <div class="layout-page">

        <Navbar />

        <div class="content-wrapper">

            <div class="container-xxl flex-grow-1 container-p-y">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h4 class="fw-bold">Saldo Sekarang: {{ formatedBalance }}</h4>
                    <button class="btn btn-primary align-self-start" @click="balanceIn">
                        Tambah Saldo
                    </button>
                </div>

                <div class="row">
                    <div class="col-12 col-md-6">
                        <CreditView @loadBalance="loadData" :toastStatus="toastStatus" @pushToast="pushToast" />
                    </div>
                    <div class="col-12 col-md-6">
                        <TopupView @loadBalance="loadData" :toastStatus="toastStatus" @pushToast="pushToast" />
                    </div>
                </div>
            </div>
        </div>
    </div>

    <ModalBalanceIn ref="modalBalanceIn" @loadData="loadData" :toastStatus="toastStatus" @pushToast="pushToast" />
</template>
<script>
import FormModal from '@/components/Modal.vue';
import Navbar from '@/components/Navbar.vue';
import CreditView from '@/views/balances/CreditView.vue';
import TopupView from '@/views/balances/TopupView.vue';
import ModalBalanceIn from '@/components/modals/BalanceIn.vue';

// API
import getBalance from '@/methods/api/index';

export default {
    props: ['toastStatus'],
    emits: ["pushToast"],
    components: {
        FormModal,
        Navbar,
        CreditView,
        TopupView,
        ModalBalanceIn
    },
    data() {
        return {
            data: {
                balance: 0,
            },
            endpoint: 'balances',
        }
    },
    computed: {
        formatedBalance() {
            return this.data.balance;
        }
    },
    methods: {
        getBalance,
        pushToast(status, message) {
            this.$emit('pushToast', status, message);
        },
        async loadData() {
            this.data.balance = (await this.getBalance(this.endpoint))[0].balance;
            return;
        },
        async balanceIn() {
            this.$refs.modalBalanceIn.openModal();
        },
    },
    async mounted() {
        this.loadData();
    },
}
</script>