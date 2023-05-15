<template>
    <div class="layout-page" style="padding-left: 16rem;">

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
                            <div class="card accordion-item" v-for="item_type in data.item_types" :key="item_type.id">
                                <h2 class="accordion-header" :id="`heading-${item_type.id}`">
                                    <button type="button" class="accordion-button collapsed" data-bs-toggle="collapse"
                                        :data-bs-target="`#accordion-${item_type.id}`" aria-expanded="false"
                                        :aria-controls="`accordion-${item_type.id}`" @click="loadData(item_type.id)">
                                        {{ item_type.name }}
                                    </button>
                                </h2>
                                <div :id="`accordion-${item_type.id}`" class="accordion-collapse collapse"
                                    :aria-labelledby="`heading-${item_type.id}`" data-bs-parent="#accordionExample">
                                    <div class="accordion-body">
                                        <div class="table-responsive text-nowrap">
                                            <table class="table">
                                                <thead>
                                                    <tr>
                                                        <th class="py-3 text-center">Nama</th>
                                                        <th class="py-3 text-center">Harga Beli</th>
                                                        <th class="py-3 text-center">Harga Jual</th>
                                                        <th class="py-3 text-center">Stok</th>
                                                        <th class="py-3 text-center">Aksi</th>
                                                    </tr>
                                                </thead>
                                                <tbody class="table-border-bottom-0">
                                                    <tr v-for="item in data.items[item_type.id]" :key="item.id">
                                                        <td class="text-center">{{ item.name }}</td>
                                                        <td class="text-center">{{ item.price_buy }}</td>
                                                        <td class="text-center">{{ item.price_sell }}</td>
                                                        <td class="text-center">{{ item.stock }}</td>
                                                        <td class="text-center td-fit">
                                                            <div class="d-flex gap-2">
                                                                <button @click="formModal(item.id, item.item_type_id)"
                                                                    class="btn btn-warning btn-sm">Edit</button>
                                                                <button @click="deleteItem(item.id, item.item_type_id)"
                                                                    class="btn btn-danger btn-sm">Hapus</button>
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
                    </div>
                </div>
            </div>
        </div>
    </div>

    <FormModal ref="modal">
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
    </FormModal>
</template>

<script>
import FormModal from '@/components/Modal.vue';
import Navbar from '@/components/Navbar.vue';

// API
import getData from '@/methods/api/index';
import addItem from '@/methods/api/store';
import editItem from '@/methods/api/update';
import getItemById from '@/methods/api/show';
import destroy from '@/methods/api/destroy';

import { Modal } from 'bootstrap';
export default {
    components: {
        FormModal,
        Navbar,
    },
    data() {
        return {
            data: {
                items: {},
                item_types: [],
                modal: null,
                itemId: null,
                itemTypeId: null,
            },
            inputs: {
                item_type_id: '',
                name: '',
                price_buy: '',
                price_sell: '',
                description: ''
            },
            endpoint: 'items'
        }
    },
    methods: {
        getData,
        addItem,
        editItem,
        getItemById,
        destroy,
        async deleteItem(itemId, itemTypeId) {
            await this.destroy(this.endpoint, itemId);
            this.loadData(itemTypeId);
        },
        async formModal(itemId, itemTypeId) {
            this.data.itemId = null;
            this.data.itemTypeId = null;
            if (itemId) {
                this.data.itemId = itemId;
                this.data.itemTypeId = itemTypeId;

                const response = await this.getItemById(this.endpoint, itemId);

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
                response = await this.editItem(this.endpoint, this.data.itemId, {
                    item_type_id: this.inputs.item_type_id,
                    name: this.inputs.name,
                    price_buy: this.inputs.price_buy,
                    price_sell: this.inputs.price_sell,
                    description: this.inputs.description,
                });

                if (this.data.itemTypeId != this.inputs.item_type_id) {
                    this.loadData(this.data.itemTypeId);
                }
            } else {
                response = await this.addItem(this.endpoint, {
                    item_type_id: this.inputs.item_type_id,
                    name: this.inputs.name,
                    price_buy: this.inputs.price_buy,
                    price_sell: this.inputs.price_sell,
                    description: this.inputs.description,
                });
            }

            console.log(response);

            this.loadData(this.inputs.item_type_id);
            this.data.modal.hide();
            this.inputs.name = '';
            this.inputs.price_buy = '';
            this.inputs.price_sell = '';
            this.inputs.description = '';
        },
        async loadData(itemTypeId) {
            this.data.items[itemTypeId] = await this.getData(this.endpoint, {
                item_type_id: itemTypeId
            });
        },
        async loadItemTypes() {
            this.data.item_types = await this.getData('item-types');
        },
    },
    async mounted() {
        this.data.modal = new Modal(this.$refs.modal.$refs.modal)
        await this.loadItemTypes();
    },
}
</script>