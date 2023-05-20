<template>
    <div class="layout-page">

        <Navbar />

        <div class="content-wrapper">

            <div class="container-xxl flex-grow-1 container-p-y">
                <h4 class="fw-bold">Riwayat Topup Keluar</h4>

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
                                <tr v-for="topupOut in data.topupOut" :key="topupOut.id">
                                    <td class="text-center">{{ topupOut.topup_name }}</td>
                                    <td class="text-center">{{ topupOut.price_sell }}</td>
                                    <td class="text-center">{{ topupOut.amount }}</td>
                                    <td class="text-center td-fit">
                                        <div class="d-flex gap-2">
                                            <button @click="editTopupOut(topupOut, topupOut.topup_prices, topupOut.id)"
                                                class="btn btn-warning btn-sm">
                                                Edit
                                            </button>
                                            <button @click="deleteTopupOut(topupOut.id)" class="btn btn-danger btn-sm">
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

    <ModalTopupOut ref="modalTopupOut" @loadData="loadData" />
</template>
<script>
import Navbar from '@/components/Navbar.vue';
import ModalTopupOut from '@/components/modals/TopupOut.vue';

// API
import getTopupOut from '@/methods/api/index';
import destroy from '@/methods/api/destroy';

export default {
    components: {
        Navbar,
        ModalTopupOut
    },
    data() {
        return {
            data: {
                topupOut: [],
                topupPrices: [],
            },
            endpoint: 'topup-out'
        }
    },
    methods: {
        getTopupOut,
        destroy,
        editTopupOut(topup, topupPrices, topupOutId) {
            const isExist = topupPrices.filter(topupPrice => topupPrice.amount == topup.amount && topupPrice.price == topup.price_sell)
            if (!isExist.length) {
                topupPrices.unshift({
                    price: topup.price_sell,
                    amount: topup.amount,
                })
            }
            this.$refs.modalTopupOut.openModal(topup, topupPrices, topupOutId);
        },
        async deleteTopupOut(topupOutId) {
            await this.destroy(this.endpoint, topupOutId);
            this.loadData();
        },
        async loadData() {
            this.data.topupOut = await this.getTopupOut(this.endpoint);
        }
    },
    async mounted() {
        this.loadData();
    },
}
</script>