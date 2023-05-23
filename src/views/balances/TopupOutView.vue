<template>
    <div class="layout-page">

        <Navbar />

        <div class="content-wrapper">

            <div class="container-xxl flex-grow-1 container-p-y">
                <h4 class="fw-bold">Riwayat Penjualan Topup</h4>

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
                        v-model:server-options="serverOptions" :headers="headers" :items="data.topupOut" :loading="loading"
                        :server-items-length="data.itemsLength" buttons-pagination show-index
                        :body-item-class-name="bodyItemClass" :header-item-class-name="headerItemClass"
                        header-text-direction="center" hide-footer ref="dataTable" :search-value="inputs.keyword">

                        <template #item-action="topupOut">
                            <div class="d-flex gap-2">
                                <button @click="editTopupOut(topupOut, topupOut.topup_prices, topupOut.id)"
                                    class="btn btn-warning btn-sm">
                                    Edit
                                </button>
                                <button @click="deleteTopupOut(topupOut.id)" class="btn btn-danger btn-sm">
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

    <ModalTopupOut ref="modalTopupOut" @loadData="loadData" />
</template>
<script>
import { ref } from 'vue';

import Navbar from '@/components/Navbar.vue';
import ModalTopupOut from '@/components/modals/TopupOut.vue';

// API
import getTopupOut from '@/methods/api/index';
import destroy from '@/methods/api/destroy';

// vue3 easy data table
import dataTableComputedProperties from "@/plugins/vue3_easy_data_table/computed";
import dataTableMethods from "@/plugins/vue3_easy_data_table/methods";

export default {
    props: ['toastStatus'],
    emits: ["toastStatus", "pushToast"],
    components: {
        Navbar,
        ModalTopupOut
    },
    setup() {
        const headers = [
            { text: "Tanggal", value: "out_date", sortable: true },
            { text: "Harga Jual", value: "price_sell", sortable: true },
            { text: "Jumlah", value: "amount", sortable: true },
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
                topupOut: [],
                topupPrices: [],
                itemsLength: 0,
            },
            inputs: {
                keyword: '',
            },
            endpoint: 'topup-out',
            loading: false,
            isMounted: false
        }
    },
    computed: {
        ...dataTableComputedProperties,
    },
    methods: {
        ...dataTableMethods,
        bodyItemClass(column, index) {
            if (['index', 'out_date', 'price_sell', 'amount'].includes(column)) return 'text-center';
        },
        headerItemClass(column, index) {
            if (['index', 'action'].includes(column.value)) return 'td-fit';
        },
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
            this.loading = true;
            const response = await this.getTopupOut(this.endpoint, {}, this.serverOptions);
            this.data.topupOut = response.items;
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