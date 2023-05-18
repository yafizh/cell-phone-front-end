<template>
    <div class="layout-page">

        <Navbar />

        <div class="content-wrapper">

            <div class="container-xxl flex-grow-1 container-p-y">
                <h4 class="fw-bold">Riwayat Barang Keluar</h4>

                <div class="card">
                    <div class="table-responsive text-nowrap">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th class="py-3 text-center">Jenis Barang</th>
                                    <th class="py-3 text-center">Nama Barang</th>
                                    <th class="py-3 text-center">Harga Jual</th>
                                    <th class="py-3 text-center">Jumlah</th>
                                    <th class="py-3 text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody class="table-border-bottom-0">
                                <tr v-for="itemOut in data.itemOut" :key="itemOut.id">
                                    <td class="text-center">{{ itemOut.item_type }}</td>
                                    <td class="text-center">{{ itemOut.item_name }}</td>
                                    <td class="text-center">{{ itemOut.price_sell }}</td>
                                    <td class="text-center">{{ itemOut.count }}</td>
                                    <td class="text-center td-fit">
                                        <div class="d-flex gap-2">
                                            <button @click="editItemOut(itemOut, itemOut.id)" class="btn btn-warning btn-sm">
                                                Edit
                                            </button>
                                            <button @click="deleteItemOut(itemOut.id)" class="btn btn-danger btn-sm">
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

    <ModalItemOut ref="modalItemOut" @loadData="loadData" />
</template>
<script>
import Navbar from '@/components/Navbar.vue';
import ModalItemOut from '@/components/modals/ItemOut.vue';

// API
import getItemOut from '@/methods/api/index';
import destroy from '@/methods/api/destroy';

export default {
    components: {
        Navbar,
        ModalItemOut
    },
    data() {
        return {
            data: {
                itemOut: [],
            },
            endpoint: 'item-out'
        }
    },
    methods: {
        getItemOut,
        destroy,
        editItemOut(item, itemOutId) {
            this.$refs.modalItemOut.openModal(item, itemOutId);
        },
        async deleteItemOut(itemOutId) {
            await this.destroy(this.endpoint, itemOutId);
            this.loadData();
        },
        async loadData() {
            this.data.itemOut = await this.getItemOut(this.endpoint);
        }
    },
    async mounted() {
        this.loadData();
    },
}
</script>