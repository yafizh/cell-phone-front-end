<template>
    <div class="modal fade" ref="modal" tabindex="-1" aria-labelledby="formModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="formModalLabel">Pulsa Keluar</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="mb-3">
                            <label class="form-label">Nama Provider</label>
                            <input type="text" v-model="data.name" class="form-control" disabled>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Harga Jual</label>
                            <select v-model="inputs.priceSell" @change="setAmount($event)" class="form-control" required>
                                <option :value="creditPrice.price" v-for="creditPrice in data.creditPrices"
                                    :key="creditPrice.id">
                                    {{ creditPrice.price }}
                                </option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Jumlah</label>
                            <input type="number" v-model="inputs.amount" class="form-control" disabled>
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
import addCreditOut from '@/methods/api/store';
import editCreditOut from '@/methods/api/update';
import getCreditOutById from '@/methods/api/show';

export default {
    props: ['name', 'creditPrices'],
    data() {
        return {
            data: {
                creditOutId: null,
                creditId: null,
                name: '',
                creditPrices: []
            },
            inputs: {
                amount: 0,
                priceSell: 0,
            },
            modal: null,
            endpoint: 'credit-out'
        }
    },
    methods: {
        setAmount(event) {
            this.inputs.amount = this.data.creditPrices[event.target.selectedIndex].amount;
        },
        addCreditOut,
        editCreditOut,
        getCreditOutById,
        openModal(credit, creditPrices, creditOutId = null) {
            this.data.creditPrices = creditPrices;
            if (creditOutId) {
                this.data.creditOutId = creditOutId;
                this.data.name = credit.credit_name;
                this.inputs.priceSell = credit.price_sell;
                this.inputs.amount = credit.amount;
            } else {
                this.data.creditId = credit.id;
                this.data.name = credit.name;
            }
            this.modal.show();
        },
        async submit() {
            let response = null;
            if (this.data.creditOutId) {
                response = await this.editCreditOut(
                    this.endpoint,
                    this.data.creditOutId,
                    {
                        price_sell: this.inputs.priceSell,
                        amount: this.inputs.amount,
                    });
                this.$emit('loadData');
            } else {
                response = await this.addCreditOut(
                    this.endpoint,
                    {
                        credit_id: this.data.creditId,
                        price_sell: this.inputs.priceSell,
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