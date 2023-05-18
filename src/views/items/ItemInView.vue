<template>
    <div class="layout-page">

        <Navbar />

        <div class="content-wrapper">

            <div class="container-xxl flex-grow-1 container-p-y">
                <h4 class="fw-bold">Riwayat Barang Masuk</h4>

                <div class="card">
                    <div class="table-responsive text-nowrap">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th class="py-3 text-center">Jenis Barang</th>
                                    <th class="py-3 text-center">Nama Barang</th>
                                    <th class="py-3 text-center">Harga Beli</th>
                                    <th class="py-3 text-center">Jumlah</th>
                                    <th class="py-3 text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody class="table-border-bottom-0">
                                <tr v-for="itemIn in data.itemIn" :key="itemIn.id">
                                    <td class="text-center">{{ itemIn.item_type }}</td>
                                    <td class="text-center">{{ itemIn.item_name }}</td>
                                    <td class="text-center">{{ itemIn.price_buy }}</td>
                                    <td class="text-center">{{ itemIn.count }}</td>
                                    <td class="text-center td-fit">
                                        <div class="d-flex gap-2">
                                            <button @click="editItemIn(itemIn, itemIn.id)" class="btn btn-warning btn-sm">
                                                Edit
                                            </button>
                                            <button @click="deleteItemIn(itemIn.id)" class="btn btn-danger btn-sm">
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

    <ModalItemIn ref="modalItemIn" @loadData="loadData" />
</template>
<script>
import Navbar from '@/components/Navbar.vue';
import ModalItemIn from '@/components/modals/ItemIn.vue';

// API
import getItemIn from '@/methods/api/index';
import destroy from '@/methods/api/destroy';

export default {
    components: {
        Navbar,
        ModalItemIn
    },
    data() {
        return {
            data: {
                itemIn: [],
            },
            endpoint: 'item-in'
        }
    },
    methods: {
        getItemIn,
        destroy,
        editItemIn(item, itemInId) {
            this.$refs.modalItemIn.openModal(item, itemInId);
        },
        async deleteItemIn(itemInId) {
            await this.destroy(this.endpoint, itemInId);
            this.loadData();
        },
        async loadData() {
            this.data.itemIn = await this.getItemIn(this.endpoint);
        }
    },
    async mounted() {
        this.loadData();
    },
}
</script>