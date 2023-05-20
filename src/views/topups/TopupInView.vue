<template>
    <div class="layout-page">

        <Navbar />

        <div class="content-wrapper">

            <div class="container-xxl flex-grow-1 container-p-y">
                <h4 class="fw-bold">Riwayat Topup Masuk</h4>

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
                                <tr v-for="topupIn in data.topupIn" :key="topupIn.id">
                                    <td class="text-center">{{ topupIn.topup_name }}</td>
                                    <td class="text-center">{{ topupIn.price_buy }}</td>
                                    <td class="text-center">{{ topupIn.amount }}</td>
                                    <td class="text-center td-fit">
                                        <div class="d-flex gap-2">
                                            <button @click="editTopupIn(topupIn, topupIn.id)"
                                                class="btn btn-warning btn-sm">
                                                Edit
                                            </button>
                                            <button @click="deleteTopupIn(topupIn.id)" class="btn btn-danger btn-sm">
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

    <ModalTopupIn ref="modalTopupIn" @loadData="loadData" />
</template>
<script>
import Navbar from '@/components/Navbar.vue';
import ModalTopupIn from '@/components/modals/TopupIn.vue';

// API
import getTopupIn from '@/methods/api/index';
import destroy from '@/methods/api/destroy';

export default {
    components: {
        Navbar,
        ModalTopupIn
    },
    data() {
        return {
            data: {
                topupIn: [],
            },
            endpoint: 'topup-in'
        }
    },
    methods: {
        getTopupIn,
        destroy,
        editTopupIn(topup, topupInId) {
            this.$refs.modalTopupIn.openModal(topup, topupInId);
        },
        async deleteTopupIn(topupInId) {
            await this.destroy(this.endpoint, topupInId);
            this.loadData();
        },
        async loadData() {
            this.data.topupIn = await this.getTopupIn(this.endpoint);
        }
    },
    async mounted() {
        this.loadData();
    },
}
</script>