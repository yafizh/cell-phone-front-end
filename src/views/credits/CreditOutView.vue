<template>
    <div class="layout-page">

        <Navbar />

        <div class="content-wrapper">

            <div class="container-xxl flex-grow-1 container-p-y">
                <h4 class="fw-bold">Riwayat Pulsa Keluar</h4>

                <div class="card">
                    <div class="table-responsive text-nowrap">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th class="py-3 text-center">Nama Provider</th>
                                    <th class="py-3 text-center">Harga Jual</th>
                                    <th class="py-3 text-center">Jumlah</th>
                                    <th class="py-3 text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody class="table-border-bottom-0">
                                <tr v-for="creditOut in data.creditOut" :key="creditOut.id">
                                    <td class="text-center">{{ creditOut.credit_name }}</td>
                                    <td class="text-center">{{ creditOut.price_sell }}</td>
                                    <td class="text-center">{{ creditOut.amount }}</td>
                                    <td class="text-center td-fit">
                                        <div class="d-flex gap-2">
                                            <button @click="editCreditOut(creditOut, creditOut.credit_prices, creditOut.id)"
                                                class="btn btn-warning btn-sm">
                                                Edit
                                            </button>
                                            <button @click="deleteCreditOut(creditOut.id)" class="btn btn-danger btn-sm">
                                                Hapus
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <ModalCreditOut ref="modalCreditOut" @loadData="loadData" />
</template>
<script>
import Navbar from '@/components/Navbar.vue';
import ModalCreditOut from '@/components/modals/CreditOut.vue';

// API
import getCreditOut from '@/methods/api/index';
import destroy from '@/methods/api/destroy';

export default {
    components: {
        Navbar,
        ModalCreditOut
    },
    data() {
        return {
            data: {
                creditOut: [],
                creditPrices: [],
            },
            endpoint: 'credit-out'
        }
    },
    methods: {
        getCreditOut,
        destroy,
        editCreditOut(credit, creditPrices, creditOutId) {
            const isExist = creditPrices.filter(creditPrice => creditPrice.amount == credit.amount && creditPrice.price == credit.price_sell)
            if (!isExist.length) {
                creditPrices.unshift({
                    price: credit.price_sell,
                    amount: credit.amount,
                })
            }
            this.$refs.modalCreditOut.openModal(credit, creditPrices, creditOutId);
        },
        async deleteCreditOut(creditOutId) {
            await this.destroy(this.endpoint, creditOutId);
            this.loadData();
        },
        async loadData() {
            this.data.creditOut = await this.getCreditOut(this.endpoint);
        }
    },
    async mounted() {
        this.loadData();
    },
}
</script>