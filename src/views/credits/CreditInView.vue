<template>
    <div class="layout-page">

        <Navbar />

        <div class="content-wrapper">

            <div class="container-xxl flex-grow-1 container-p-y">
                <h4 class="fw-bold">Riwayat Pulsa Masuk</h4>

                <div class="card">
                    <div class="table-responsive text-nowrap">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th class="py-3 text-center">Nama Provider</th>
                                    <th class="py-3 text-center">Harga Beli</th>
                                    <th class="py-3 text-center">Jumlah</th>
                                    <th class="py-3 text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody class="table-border-bottom-0">
                                <tr v-for="creditIn in data.creditIn" :key="creditIn.id">
                                    <td class="text-center">{{ creditIn.credit_name }}</td>
                                    <td class="text-center">{{ creditIn.price_buy }}</td>
                                    <td class="text-center">{{ creditIn.amount }}</td>
                                    <td class="text-center td-fit">
                                        <div class="d-flex gap-2">
                                            <button @click="editCreditIn(creditIn, creditIn.id)"
                                                class="btn btn-warning btn-sm">
                                                Edit
                                            </button>
                                            <button @click="deleteCreditIn(creditIn.id)" class="btn btn-danger btn-sm">
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

    <ModalCreditIn ref="modalCreditIn" @loadData="loadData" />
</template>
<script>
import Navbar from '@/components/Navbar.vue';
import ModalCreditIn from '@/components/modals/CreditIn.vue';

// API
import getCreditIn from '@/methods/api/index';
import destroy from '@/methods/api/destroy';

export default {
    components: {
        Navbar,
        ModalCreditIn
    },
    data() {
        return {
            data: {
                creditIn: [],
            },
            endpoint: 'credit-in'
        }
    },
    methods: {
        getCreditIn,
        destroy,
        editCreditIn(credit, creditInId) {
            this.$refs.modalCreditIn.openModal(credit, creditInId);
        },
        async deleteCreditIn(creditInId) {
            await this.destroy(this.endpoint, creditInId);
            this.loadData();
        },
        async loadData() {
            this.data.creditIn = await this.getCreditIn(this.endpoint);
        }
    },
    async mounted() {
        this.loadData();
    },
}
</script>