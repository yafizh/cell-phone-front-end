<template>
    <div class="modal fade" ref="modal" tabindex="-1" aria-labelledby="formModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="formModalLabel">Topup Masuk</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="mb-3">
                            <label class="form-label">Nama Provider</label>
                            <input type="text" v-model="data.name" class="form-control" disabled>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Harga Beli</label>
                            <input type="number" v-model="inputs.priceBuy" class="form-control" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Jumlah</label>
                            <input type="number" v-model="inputs.amount" class="form-control" required>
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
import addTopupIn from '@/methods/api/store';
import editTopupIn from '@/methods/api/update';
import getTopupInById from '@/methods/api/show';

export default {
    props: ['name'],
    data() {
        return {
            data: {
                topupInId: null,
                topupId: null,
                name: '',
            },
            inputs: {
                amount: 0,
                priceBuy: 0,
            },
            modal: null,
            endpoint: 'topup-in'
        }
    },
    methods: {
        addTopupIn,
        editTopupIn,
        getTopupInById,
        openModal(topup, topupInId = null) {
            if (topupInId) {
                this.data.topupInId = topupInId;
                this.data.name = topup.topup_name;
                this.inputs.priceBuy = topup.price_buy;
                this.inputs.amount = topup.amount;
            } else {
                this.data.topupId = topup.id;
                this.data.name = topup.name;
            }
            this.modal.show();
        },
        async submit() {
            let response = null;
            if (this.data.topupInId) {
                response = await this.editTopupIn(
                    this.endpoint,
                    this.data.topupInId,
                    {
                        price_buy: this.inputs.priceBuy,
                        amount: this.inputs.amount,
                    });
                this.$emit('loadData');
            } else {
                response = await this.addTopupIn(
                    this.endpoint,
                    {
                        topup_id: this.data.topupId,
                        price_buy: this.inputs.priceBuy,
                        amount: this.inputs.amount,
                    });
                this.$emit('loadData', this.name);
            }

            console.log(response)
            this.modal.hide();
        },
        hiddenBsModal() {
            this.inputs.priceBuy = 0;
            this.inputs.amount = 0;
        }
    },
    mounted() {
        this.modal = new Modal(this.$refs.modal);
        this.$refs.modal.addEventListener('hidden.bs.modal', this.hiddenBsModal);
    }
}
</script>