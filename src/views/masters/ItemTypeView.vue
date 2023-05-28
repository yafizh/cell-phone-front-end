<template>
    <div class="layout-page">

        <Navbar>
            <div class="navbar-nav align-items-center">
                <div class="nav-item d-flex align-items-center">
                    <i class="bx bx-search fs-4 lh-0"></i>
                    <input type="text" v-model="inputs.keyword" @input="search" class="form-control border-0 shadow-none"
                        placeholder="Nama Jenis Barang..." />
                </div>
            </div>
        </Navbar>

        <div class="content-wrapper">

            <div class="container-xxl flex-grow-1 container-p-y">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h4 class="fw-bold">Data Jenis Barang</h4>
                    <button class="btn btn-primary align-self-start" @click="formModal(false)">Tambah</button>
                </div>

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
                        v-model:server-options="serverOptions" :headers="headers" :items="data.itemTypes" :loading="loading"
                        :server-items-length="data.itemsLength" buttons-pagination show-index
                        :body-item-class-name="bodyItemClass" :header-item-class-name="headerItemClass"
                        header-text-direction="center" hide-footer ref="dataTable" :search-value="inputs.keyword">

                        <template #item-action="itemType">
                            <div class="d-flex gap-2">
                                <button @click="formModal(itemType.id)" class="btn btn-warning btn-sm">Edit</button>
                                <button @click="deleteItemType(itemType.id)" class="btn btn-danger btn-sm">Hapus</button>
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

    <FormModal ref="modal">
        <template #title>
            Jenis Barang
        </template>
        <template #body>
            <form>
                <div class="mb-3">
                    <label class="form-label">Nama Jenis Barang</label>
                    <input type="text" v-model="inputs.name" class="form-control" required autocomplete="username">
                </div>
                <div class="mb-3">
                    <label class="form-label">Urutan</label>
                    <input type="number" v-model="inputs.order" class="form-control" required min="1">
                </div>
                <div class="mb-3">
                    <button @click.prevent="submitForm" class="btn btn-primary float-end">Submit</button>
                </div>
            </form>
        </template>
    </FormModal>
</template>
<script>
import { ref } from 'vue';

import FormModal from '@/components/Modal.vue';
import Navbar from '@/components/Navbar.vue';

// API
import getItemTypes from '@/methods/api/index';
import addItemType from '@/methods/api/store';
import editItemType from '@/methods/api/update';
import getItemTypeById from '@/methods/api/show';
import destroy from '@/methods/api/destroy';

// vue3 easy data table
import dataTableComputedProperties from "@/plugins/vue3_easy_data_table/computed";
import dataTableMethods from "@/plugins/vue3_easy_data_table/methods";

import { Modal } from 'bootstrap';
export default {
    props: ['toastStatus'],
    emits: ["pushToast"],
    components: {
        FormModal,
        Navbar,
    },
    setup() {
        const headers = [
            { text: "Name Jenis Barang", value: "name", },
            { text: "Urutan", value: "order", },
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
                itemTypes: [],
                itemsLength: 0,
                modal: null,
                itemTypeId: null,
            },
            inputs: {
                name: '',
                order: '',
                keyword: ''
            },
            endpoint: 'item-types',
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
            if (['index', 'name', 'order'].includes(column)) return 'text-center';
        },
        headerItemClass(column, index) {
            if (['index', 'action'].includes(column.value)) return 'td-fit';
        },
        getItemTypes,
        addItemType,
        editItemType,
        getItemTypeById,
        destroy,
        search() {
            this.loadData();
        },
        async deleteItemType(itemTypeId) {
            const response = await this.destroy(this.endpoint, itemTypeId);
            if (response.data.success)
                this.$emit(
                    'pushToast',
                    this.toastStatus.success,
                    'Jenis barang berhasil dihapus!'
                );
            else
                this.$emit(
                    'pushToast',
                    this.toastStatus.failed,
                    'Jenis barang gagal dihapus!'
                );
            this.loadData();
        },
        async formModal(itemTypeId) {
            this.data.itemTypeId = null;
            if (itemTypeId) {
                this.data.itemTypeId = itemTypeId;
                const response = await this.getItemTypeById(this.endpoint, itemTypeId);

                if (response.status === 200) {
                    this.inputs.name = response.data.name;
                    this.inputs.order = response.data.order;
                }
            }
            this.data.modal.show();
        },
        async submitForm() {
            let response = null;
            if (this.data.itemTypeId) {
                response = await this.editItemType(this.endpoint, this.data.itemTypeId, {
                    name: this.inputs.name,
                    order: this.inputs.order,
                });

                if (response.data.success)
                    this.$emit(
                        'pushToast',
                        this.toastStatus.success,
                        'Jenis barang berhasil diperbaharui!'
                    );
                else
                    this.$emit(
                        'pushToast',
                        this.toastStatus.failed,
                        'Jenis barang gagal diperbaharui!'
                    );
            } else {
                response = await this.addItemType(this.endpoint, {
                    name: this.inputs.name,
                    order: this.inputs.order,
                });

                if (response.data.success)
                    this.$emit(
                        'pushToast',
                        this.toastStatus.success,
                        'Jenis barang berhasil ditambah!'
                    );
                else
                    this.$emit(
                        'pushToast',
                        this.toastStatus.failed,
                        'Jenis barang gagal ditambah!'
                    );
            }

            this.loadData();
            this.data.modal.hide();
            this.inputs.name = '';
            this.inputs.order = '';
        },
        async loadData() {
            this.loading = true;
            const response = await this.getItemTypes(this.endpoint, {
                keyword: this.inputs.keyword
            }, this.serverOptions);
            this.data.itemTypes = response.items;
            this.data.itemsLength = response.itemsLength;
            this.loading = false;
        },
        hiddenBsModal() {
            this.inputs.name = '';
            this.inputs.order = '';
        }
    },
    async mounted() {
        this.data.modal = new Modal(this.$refs.modal.$refs.modal);
        this.$refs.modal.$refs.modal.addEventListener('hidden.bs.modal', this.hiddenBsModal);
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