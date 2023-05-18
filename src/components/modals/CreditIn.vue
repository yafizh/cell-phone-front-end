<template>
    <div class="modal fade" ref="modal" tabindex="-1" aria-labelledby="formModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="formModalLabel">Pulsa Masuk</h1>
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
import addCreditIn from '@/methods/api/store';
import editCreditIn from '@/methods/api/update';
import getCreditInById from '@/methods/api/show';

export default {
    props: ['name'],
    data() {
        return {
            data: {
                creditInId: null,
                creditId: null,
                name: '',
            },
            inputs: {
                amount: 0,
                priceBuy: 0,
            },
            modal: null,
            endpoint: 'credit-in'
        }
    },
    methods: {
        addCreditIn,
        editCreditIn,
        getCreditInById,
        openModal(credit, creditInId = null) {
            if (creditInId) {
                this.data.creditInId = creditInId;
                this.data.name = credit.credit_name;
                this.inputs.priceBuy = credit.price_buy;
                this.inputs.amount = credit.amount;
            } else {
                this.data.creditId = credit.id;
                this.data.name = credit.name;
            }
            this.modal.show();
        },
        async submit() {
            let response = null;
            if (this.data.creditInId) {
                response = await this.editCreditIn(
                    this.endpoint,
                    this.data.creditInId,
                    {
                        price_buy: this.inputs.priceBuy,
                        amount: this.inputs.amount,
                    });
                this.$emit('loadData');
            } else {
                response = await this.addCreditIn(
                    this.endpoint,
                    {
                        credit_id: this.data.creditId,
                        price_buy: this.inputs.priceBuy,
                        amount: this.inputs.amount,
                    });
                this.$emit('loadData', this.name);
            }

            this.modal.hide();
        }
    },
    mounted() {
        this.modal = new Modal(this.$refs.modal);
    }
}
</script>