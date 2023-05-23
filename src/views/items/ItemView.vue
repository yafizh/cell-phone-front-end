<template>
    <div class="layout-page">
        <Navbar />

        <div class="content-wrapper">

            <div class="container-xxl flex-grow-1 container-p-y">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h4 class="fw-bold">Data Barang</h4>
                    <button class="btn btn-primary align-self-start" @click="formModal(false)">Tambah</button>
                </div>

                <div class="row">
                    <div class="col-md mb-4 mb-md-0">
                        <div class="accordion mt-3" id="accordionExample">
                            <div class="card accordion-item" v-for="(item_type, index) in data.item_types"
                                :key="item_type.id">
                                <h2 class="accordion-header" :id="`heading-${item_type.id}`">
                                    <button type="button" class="accordion-button collapsed" data-bs-toggle="collapse"
                                        :data-bs-target="`#accordion-${item_type.id}`" aria-expanded="false"
                                        :aria-controls="`accordion-${item_type.id}`" @click="loadData(index)">
                                        {{ item_type.name }}
                                    </button>
                                </h2>
                                <div :id="`accordion-${item_type.id}`" class="accordion-collapse collapse"
                                    :aria-labelledby="`heading-${item_type.id}`" data-bs-parent="#accordionExample">
                                    <div class="accordion-body">
                                        <EasyDataTable :theme-color="'#12345'" table-class-name="customize-table mb-3"
                                            v-model:server-options="serverOptions[index]" :headers="headers"
                                            :items="data.items[index]" :loading="loading[index]"
                                            :server-items-length="data.itemsLength[index]" buttons-pagination show-index
                                            :body-item-class-name="bodyItemClass" :header-item-class-name="headerItemClass"
                                            header-text-direction="center" hide-footer ref="dataTable">

                                            <template #item-action="item">
                                                <div class="d-flex gap-2 text-nowrap">
                                                    <button @click="itemIn(item)" class="btn btn-info btn-sm">
                                                        Barang Masuk
                                                    </button>
                                                    <button @click="itemOut(item)" class="btn btn-success btn-sm">
                                                        Barang Terjual
                                                    </button>
                                                    <button @click="formModal(item.id, item.item_type_id)"
                                                        class="btn btn-warning btn-sm">
                                                        Edit
                                                    </button>
                                                    <button @click="deleteItem(item.id)" class="btn btn-danger btn-sm">
                                                        Hapus
                                                    </button>
                                                </div>
                                            </template>

                                        </EasyDataTable>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <FormModal ref="modal">
        <template #title>
            Barang
        </template>

        <template #body>
            <form>
                <div class="mb-3">
                    <label class="form-label">Jenis Barang</label>
                    <select class="form-control" v-model="inputs.item_type_id" required>
                        <option value="" selected disabled>Pilih Jenis Barang</option>
                        <option :value="item_type.id" v-for="item_type in data.item_types" :key="item_type.id">
                            {{ item_type.name }}
                        </option>
                    </select>
                </div>
                <div class="mb-3">
                    <label class="form-label">Nama Barang</label>
                    <input type="text" v-model="inputs.name" class="form-control" required>
                </div>
                <div class="mb-3">
                    <label class="form-label">Harga Beli</label>
                    <input type="number" v-model="inputs.price_buy" class="form-control" required>
                </div>
                <div class="mb-3">
                    <label class="form-label">Harga Jual</label>
                    <input type="number" v-model="inputs.price_sell" class="form-control" required>
                </div>
                <div class="mb-3">
                    <button @click.prevent="submitForm" class="btn btn-primary float-end">Submit</button>
                </div>
            </form>
        </template>
    </FormModal>

    <ModalItemIn ref="modalItemIn" @loadData="loadData" />
    <ModalItemOut ref="modalItemOut" @loadData="loadData" />
</template>

<script>
import { ref } from 'vue';

import FormModal from '@/components/Modal.vue';
import ModalItemIn from '@/components/modals/ItemIn.vue';
import ModalItemOut from '@/components/modals/ItemOut.vue';
import Navbar from '@/components/Navbar.vue';

// API
import getData from '@/methods/api/index';
import addItem from '@/methods/api/store';
import editItem from '@/methods/api/update';
import getItemById from '@/methods/api/show';
import destroy from '@/methods/api/destroy';

import { Modal } from 'bootstrap';
export default {
    props: ['toastStatus'],
    emits: ["toastStatus", "pushToast"],
    components: {
        FormModal,
        Navbar,
        ModalItemIn,
        ModalItemOut,
    },
    setup() {
        const headers = [
            { text: "Nama", value: "name", sortable: true },
            { text: "Harga Beli", value: "price_buy", sortable: true },
            { text: "Harga Jual", value: "price_sell", sortable: true },
            { text: "Stok", value: "stock", sortable: true },
            { text: "Aksi", value: "action" }
        ];

        const serverOptions = ref([]);

        return {
            headers,
            serverOptions,
        };
    },
    data() {
        return {
            data: {
                items: [],
                itemsLength: [],
                item_types: [],
                modal: null,
                modalItemIn: null,
                modalItemOut: null,
                itemId: null,
                itemTypeId: null,
                accordionActiveIndex: 0,
            },
            inputs: {
                item_type_id: '',
                name: '',
                price_buy: '',
                price_sell: '',
                description: ''
            },
            endpoint: {
                item: 'items',
                itemIn: 'item-in'
            },
            loading: [],
            isMounted: false,
        }
    },
    methods: {
        bodyItemClass(column, index) {
            if (['index', 'name', 'price_sell', 'price_buy', 'stock'].includes(column)) return 'text-center';
        },
        headerItemClass(column, index) {
            if (['index', 'action'].includes(column.value)) return 'td-fit';
        },
        getData,
        addItem,
        editItem,
        getItemById,
        destroy,
        async deleteItem(itemId) {
            await this.destroy(this.endpoint.item, itemId);
            this.loadData(this.accordionActiveIndex);
        },
        async formModal(itemId, itemTypeId) {
            this.data.itemId = null;
            this.data.itemTypeId = null;
            if (itemId) {
                this.data.itemId = itemId;
                this.data.itemTypeId = itemTypeId;

                const response = await this.getItemById(this.endpoint.item, itemId);

                if (response.status === 200) {
                    this.inputs.item_type_id = response.data.item_type_id;
                    this.inputs.name = response.data.name;
                    this.inputs.price_buy = response.data.price_buy;
                    this.inputs.price_sell = response.data.price_sell;
                    this.inputs.description = response.data.description;
                }
            }
            this.data.modal.show();
        },
        async submitForm() {
            let response = null;
            if (this.data.itemId) {
                response = await this.editItem(this.endpoint.item, this.data.itemId, {
                    item_type_id: this.inputs.item_type_id,
                    name: this.inputs.name,
                    price_buy: this.inputs.price_buy,
                    price_sell: this.inputs.price_sell,
                    description: this.inputs.description,
                });

                if (this.data.itemTypeId != this.inputs.item_type_id) {
                    this.loadData(this.data.itemTypeId);
                }
                this.$emit('pushToast', this.toastStatus.success, 'Barang berhasil diperbaharui!');
            } else {
                response = await this.addItem(this.endpoint.item, {
                    item_type_id: this.inputs.item_type_id,
                    name: this.inputs.name,
                    price_buy: this.inputs.price_buy,
                    price_sell: this.inputs.price_sell,
                    description: this.inputs.description,
                });
                this.$emit('pushToast', this.toastStatus.success, 'Barang berhasil ditambah!');
            }

            this.loadData(this.accordionActiveIndex);
            this.data.modal.hide();
            this.inputs.name = '';
            this.inputs.price_buy = '';
            this.inputs.price_sell = '';
            this.inputs.description = '';
        },
        async loadData(index) {
            this.accordionActiveIndex = index ?? this.accordionActiveIndex;

            if (this.accordionActiveIndex) {
                this.loading[this.accordionActiveIndex] = true;
                const response = await this.getData(
                    this.endpoint.item,
                    { item_type_id: this.data.item_types[this.accordionActiveIndex].id },
                    this.serverOptions[this.accordionActiveIndex]
                );
                this.data.items[this.accordionActiveIndex] = response.items;
                this.data.itemsLength[this.accordionActiveIndex] = response.itemsLength;
                this.loading[this.accordionActiveIndex] = false;
            }
        },
        async loadItemTypes() {
            this.data.item_types = await this.getData('item-types');
            this.data.item_types.forEach(() => {
                this.serverOptions.push({
                    page: 1,
                    rowsPerPage: 10,
                });
                this.loading.push(false);
                this.data.items.push([]);
                this.data.itemsLength.push(0);
            });
        },
        async itemIn(item) {
            this.$refs.modalItemIn.openModal(item);
        },
        async itemOut(item) {
            this.$refs.modalItemOut.openModal(item);
        },
        hiddenBsModal() {
            this.inputs.item_type_id = '';
            this.inputs.name = '';
            this.inputs.price_buy = '';
            this.inputs.price_sell = '';
        }
    },
    async mounted() {
        this.data.modal = new Modal(this.$refs.modal.$refs.modal);
        this.$refs.modal.$refs.modal.addEventListener('hidden.bs.modal', this.hiddenBsModal);
        await this.loadItemTypes();
        this.isMounted = true;
    },
    watch: {
        serverOptions: {
            handler(val, oldVal) {
                if (this.isMounted)
                    this.loadData(this.accordionActiveIndex);
            },
            deep: true
        },
    }
}
</script>