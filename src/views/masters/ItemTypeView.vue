<template>
    <div class="layout-page">

        <Navbar />

        <div class="content-wrapper">

            <div class="container-xxl flex-grow-1 container-p-y">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h4 class="fw-bold">Data Jenis Barang</h4>
                    <button class="btn btn-primary align-self-start" @click="formModal(false)">Tambah</button>
                </div>

                <div class="card">
                    <div class="table-responsive text-nowrap">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th class="py-3 text-center">Nama Jenis Barang</th>
                                    <th class="py-3 text-center">Urutan</th>
                                    <th class="py-3 text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody class="table-border-bottom-0">
                                <tr v-for="itemType in data.itemTypes" :key="itemType.id">
                                    <td class="text-center">{{ itemType.name }}</td>
                                    <td class="text-center">{{ itemType.order }}</td>
                                    <td class="text-center td-fit">
                                        <div class="d-flex gap-2">
                                            <button @click="formModal(itemType.id)" class="btn btn-warning btn-sm">Edit</button>
                                            <button @click="deleteItemType(itemType.id)"
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

    <FormModal ref="modal">
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
    </FormModal>
</template>
<script>
import FormModal from '@/components/Modal.vue';
import Navbar from '@/components/Navbar.vue';

// API
import getItemTypes from '@/methods/api/index';
import addItemType from '@/methods/api/store';
import editItemType from '@/methods/api/update';
import getItemTypeById from '@/methods/api/show';
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
                itemTypes: [],
                modal: null,
                itemTypeId: null,
            },
            inputs: {
                name: '',
                username: '',
                password: ''
            },
            endpoint: 'item-types'
        }
    },
    methods: {
        getItemTypes,
        addItemType,
        editItemType,
        getItemTypeById,
        destroy,
        async deleteItemType(itemTypeId){
            await this.destroy(this.endpoint, itemTypeId);
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
            if (this.data.itemTypeId) {
                await this.editItemType(this.endpoint, this.data.itemTypeId, {
                    name: this.inputs.name,
                    order: this.inputs.order,
                });
            } else {
                await this.addItemType(this.endpoint, {
                    name: this.inputs.name,
                    order: this.inputs.order,
                });
            }

            this.loadData();
            this.data.modal.hide();
            this.inputs.name = '';
            this.inputs.order = '';
        },
        async loadData() {
            this.data.itemTypes = await this.getItemTypes(this.endpoint);
        }
    },
    async mounted() {
        this.data.modal = new Modal(this.$refs.modal.$refs.modal)
        this.loadData();
    },
}
</script>