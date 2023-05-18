<template>
    <div class="modal fade" ref="modal" tabindex="-1" aria-labelledby="formModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="formModalLabel">Barang Masuk</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="mb-3">
                            <label class="form-label">Jenis Barang</label>
                            <input type="text" v-model="data.itemType" class="form-control" disabled>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Nama Barang</label>
                            <input type="text" v-model="data.name" class="form-control" disabled>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Harga Beli</label>
                            <input type="number" v-model="data.priceBuy" class="form-control" disabled>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Jumlah</label>
                            <input type="number" v-model="inputs.count" class="form-control" required>
                        </div>
                        <div class="mb-3">
                            <button @click.prevent="submit" class="btn btn-primary float-end">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Modal } from 'bootstrap';

// API
import addItemIn from '@/methods/api/store';
import editItemIn from '@/methods/api/update';
import getItemInById from '@/methods/api/show';

export default {
    data() {
        return {
            data: {
                itemInId: null,
                itemId: null,
                itemTypeId: null,
                itemType: '',
                name: '',
                priceBuy: 0,
            },
            inputs: {
                count: 0,
            },
            modal: null,
            endpoint: 'item-in'
        }
    },
    methods: {
        addItemIn,
        editItemIn,
        getItemInById,
        openModal(item, itemInId = null) {
            if (itemInId) {
                this.data.itemInId = itemInId;
                this.data.itemType = item.item_type;
                this.data.name = item.item_name;
                this.data.priceBuy = item.price_buy;
                this.inputs.count = item.count;
            } else {
                this.data.itemId = item.id;
                this.data.itemTypeId = item.item_type_id;
                this.data.itemType = item.item_type;
                this.data.name = item.name;
                this.data.priceBuy = item.price_buy;
            }
            this.modal.show();
        },
        async submit() {
            if (this.data.itemInId) {
                await this.editItemIn(
                    this.endpoint,
                    this.data.itemInId,
                    {
                        count: this.inputs.count,
                    });
                this.$emit('loadData');
            } else {
                await this.addItemIn(
                    this.endpoint,
                    {
                        item_id: this.data.itemId,
                        price_buy: this.data.priceBuy,
                        count: this.inputs.count,
                    });
                this.$emit('loadData', this.data.itemTypeId);
            }
            this.modal.hide();
        }
    },
    mounted() {
        this.modal = new Modal(this.$refs.modal);
    }
}
</script>