<template>
    <div class="modal fade" ref="modal" tabindex="-1" aria-labelledby="formModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="formModalLabel">Barang Keluar</h1>
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
                            <label class="form-label">Harga Jual</label>
                            <input type="number" v-model="inputs.priceSell" class="form-control" required>
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
import addItemOut from '@/methods/api/store';
import editItemOut from '@/methods/api/update';
import getItemOutById from '@/methods/api/show';

export default {
    props: ['toastStatus'],
    emits: ["pushToast"],
    data() {
        return {
            data: {
                itemOutId: null,
                itemId: null,
                itemTypeId: null,
                itemType: '',
                name: '',
            },
            inputs: {
                priceSell: 0,
                count: 0,
            },
            modal: null,
            endpoint: 'item-out'
        }
    },
    methods: {
        addItemOut,
        editItemOut,
        getItemOutById,
        openModal(item, itemOutId = null) {

            if (itemOutId) {
                this.data.itemOutId = itemOutId;
                this.data.itemType = item.item_type;
                this.data.name = item.item_name;
                this.inputs.priceSell = item.price_sell;
                this.inputs.count = item.count;
            } else {
                this.data.itemId = item.id;
                this.data.itemTypeId = item.item_type_id;
                this.data.itemType = item.item_type;
                this.data.name = item.name;
                this.inputs.priceSell = item.price_sell;
            }
            this.modal.show();
        },
        async submit() {
            let response = null;
            if (this.data.itemOutId) {
                response = await this.editItemOut(
                    this.endpoint,
                    this.data.itemOutId,
                    {
                        price_sell: this.inputs.priceSell,
                        count: this.inputs.count,
                    });

                if (response.data.success)
                    this.$emit(
                        'pushToast',
                        this.toastStatus.success,
                        'Berhasil memperbaharui barang terjual!'
                    );
                else
                    this.$emit(
                        'pushToast',
                        this.toastStatus.failed,
                        'Gagal memperbaharui barang terjual!'
                    );
            } else {
                response = await this.addItemOut(
                    this.endpoint,
                    {
                        item_id: this.data.itemId,
                        price_sell: this.inputs.priceSell,
                        count: this.inputs.count,
                    });

                if (response.data.success)
                    this.$emit(
                        'pushToast',
                        this.toastStatus.success,
                        'Berhasil menambah barang terjual!'
                    );
                else
                    this.$emit(
                        'pushToast',
                        this.toastStatus.failed,
                        'Gagal menambah barang terjual!'
                    );
            }

            this.$emit('loadData');
            this.modal.hide();
        },
        hiddenBsModal() {
            this.inputs.count = 0;
        }
    },
    mounted() {
        this.modal = new Modal(this.$refs.modal);
        this.$refs.modal.addEventListener('hidden.bs.modal', this.hiddenBsModal);
    }
}
</script>