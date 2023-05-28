<template>
    <div class="layout-page">

        <Navbar>
            <div class="navbar-nav align-items-center">
                <div class="nav-item d-flex align-items-center">
                    <i class="bx bx-search fs-4 lh-0"></i>
                    <input type="text" v-model="inputs.keyword" @input="search" class="form-control border-0 shadow-none"
                        placeholder="Nama Barang..." />
                </div>
            </div>
        </Navbar>

        <div class="content-wrapper">

            <div class="container-xxl flex-grow-1 container-p-y">
                <h4 class="fw-bold">Riwayat Barang Keluar</h4>

                <div class="card">

                    <div class="row px-3 pt-3">
                        <div
                            class="col-md-6 col-12 d-flex gap-2 align-items-center order-2 order-md-1 mb-3 justify-content-center justify-content-md-start">
                            <p class="mb-0">Show</p>
                            <select class="select-items form-control form-control-sm" style="width: fit-content;"
                                @change="updateRowsPerPageSelect">
                                <option v-for="item in rowsPerPageOptions" :key="item"
                                    :selected="item === rowsPerPageActiveOption" :value="item">
                                    {{ item }}
                                </option>
                            </select>
                            <p class="mb-0">rows per page</p>
                        </div>
                    </div>

                    <EasyDataTable :theme-color="'#12345'" table-class-name="customize-table mb-3"
                        v-model:server-options="serverOptions" :headers="headers" :items="data.itemOut" :loading="loading"
                        :server-items-length="data.itemsLength" buttons-pagination show-index
                        :body-item-class-name="bodyItemClass" :header-item-class-name="headerItemClass"
                        header-text-direction="center" hide-footer ref="dataTable" :search-value="inputs.keyword">

                        <template #item-price_sell="itemOut">
                            {{ numberWithDot(itemOut.price_sell) }}
                        </template>

                        <template #item-action="itemOut">
                            <div class="d-flex gap-2">
                                <button @click="editItemOut(itemOut, itemOut.id)" class="btn btn-warning btn-sm">
                                    Edit
                                </button>
                                <button @click="deleteItemOut(itemOut.id)" class="btn btn-danger btn-sm">
                                    Hapus
                                </button>
                            </div>
                        </template>

                    </EasyDataTable>

                    <div class="row px-3">
                        <div class="col-md-6 col-12 d-flex flex-column align-items-center align-items-md-start">
                            <p>Now displaying: {{ currentPageFirstIndex }} ~ {{ currentPageLastIndex }} of
                                {{ clientItemsLength }}</p>
                        </div>
                        <div
                            class="col-md-6 col-12 d-flex align-items-center justify-content-center justify-content-md-end">
                            <nav>
                                <ul class="pagination flex-wrap">
                                    <li class="page-item" @click="prevPage">
                                        <span class="page-link"
                                            :class="{ 'disabled text-muted': isFirstPage }">Previous</span>
                                    </li>
                                    <li class="page-item mb-1" :class="{ 'active': number == currentPaginationNumber }"
                                        v-for="number in paginations">
                                        <span class="page-link"
                                            @click="(number == currentPaginationNumber) ? '' : updatePage(number)"
                                            :class="{ 'disabled': isNaN(number) }">
                                            {{ number }}
                                        </span>
                                    </li>
                                    <li class="page-item" @click="nextPage">
                                        <span class="page-link" :class="{ 'disabled text-muted': isLastPage }">Next</span>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <ModalItemOut ref="modalItemOut" @loadData="loadData" :toast-status="toastStatus" @pushToast="pushToast" />
</template>
<script>
import { ref } from 'vue';

import Navbar from '@/components/Navbar.vue';
import ModalItemOut from '@/components/modals/ItemOut.vue';

// API
import getItemOut from '@/methods/api/index';
import destroy from '@/methods/api/destroy';

// vue3 easy data table
import dataTableComputedProperties from "@/plugins/vue3_easy_data_table/computed";
import dataTableMethods from "@/plugins/vue3_easy_data_table/methods";

// Methods
import numberWithDot from "@/methods/number/formatter";

export default {
    props: ['toastStatus'],
    emits: ["pushToast"],
    components: {
        Navbar,
        ModalItemOut
    },
    setup() {
        const headers = [
            { text: "Tanggal", value: "out_date", },
            { text: "Jenis Barang", value: "item_type", },
            { text: "Nama Barang", value: "item_name", },
            { text: "Harga Jual", value: "price_sell", },
            { text: "Jumlah", value: "count", },
            { text: "Aksi", value: "action" }
        ];

        const serverOptions = ref({
            page: 1,
            rowsPerPage: 10,
        });

        return {
            headers,
            serverOptions,
        };
    },
    data() {
        return {
            data: {
                itemOut: [],
                itemsLength: 0,
            },
            inputs: {
                keyword: '',
            },
            endpoint: 'item-out',
            loading: false,
            isMounted: false
        }
    },
    computed: {
        ...dataTableComputedProperties,
    },
    methods: {
        ...dataTableMethods,
        numberWithDot,
        bodyItemClass(column, index) {
            if (['index', 'out_date', 'item_type', 'name', 'count', 'price_sell'].includes(column)) return 'text-center';
        },
        headerItemClass(column, index) {
            if (['index', 'action'].includes(column.value)) return 'td-fit';
        },
        getItemOut,
        destroy,
        search() {
            this.loadData();
        },
        pushToast(status, message) {
            this.$emit('pushToast', status, message);
        },
        editItemOut(item, itemOutId) {
            this.$refs.modalItemOut.openModal(item, itemOutId);
        },
        async deleteItemOut(itemOutId) {
            const response = await this.destroy(this.endpoint, itemOutId);
            if (response.data.success)
                this.pushToast(
                    this.toastStatus.success,
                    'Berhasil menghapus penjualan barang!'
                );
            else
                this.pushToast(
                    this.toastStatus.failed,
                    'Gagal menghapus penjualan barang!'
                );
            this.loadData();
        },
        async loadData() {
            this.loading = true;
            const response = await this.getItemOut(
                this.endpoint,
                { keyword: this.inputs.keyword },
                this.serverOptions
            );
            this.data.itemOut = response.items;
            this.data.itemsLength = response.itemsLength;
            this.loading = false;
        }
    },
    async mounted() {
        await this.loadData();
        this.isMounted = true;
    },
    watch: {
        serverOptions(value) {
            this.loadData();
        },
    }
}
</script>