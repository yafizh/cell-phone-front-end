<template>
    <div class="modal fade" ref="modal" tabindex="-1" aria-labelledby="formModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="formModalLabel">Topup Keluar</h1>
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
                                <option :value="topupPrice.price" v-for="topupPrice in data.topupPrices"
                                    :key="topupPrice.id">
                                    {{ topupPrice.price }}
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
import addTopupOut from '@/methods/api/store';
import editTopupOut from '@/methods/api/update';
import getTopupOutById from '@/methods/api/show';

export default {
    props: ['name', 'topupPrices'],
    data() {
        return {
            data: {
                topupOutId: null,
                topupId: null,
                name: '',
                topupPrices: []
            },
            inputs: {
                amount: 0,
                priceSell: 0,
            },
            modal: null,
            endpoint: 'topup-out'
        }
    },
    methods: {
        setAmount(event) {
            this.inputs.amount = this.data.topupPrices[event.target.selectedIndex].amount;
        },
        addTopupOut,
        editTopupOut,
        getTopupOutById,
        openModal(topup, topupPrices, topupOutId = null) {
            this.data.topupPrices = topupPrices;
            if (topupOutId) {
                this.data.topupOutId = topupOutId;
                this.data.name = topup.topup_name;
                this.inputs.priceSell = topup.price_sell;
                this.inputs.amount = topup.amount;
            } else {
                this.data.topupId = topup.id;
                this.data.name = topup.name;
            }
            this.modal.show();
        },
        async submit() {
            let response = null;
            if (this.data.topupOutId) {
                response = await this.editTopupOut(
                    this.endpoint,
                    this.data.topupOutId,
                    {
                        price_sell: this.inputs.priceSell,
                        amount: this.inputs.amount,
                    });
                this.$emit('loadData');
            } else {
                response = await this.addTopupOut(
                    this.endpoint,
                    {
                        topup_id: this.data.topupId,
                        price_sell: this.inputs.priceSell,
                        amount: this.inputs.amount,
                    });
                this.$emit('loadData', this.name);
            }

            this.modal.hide();
        },
        hiddenBsModal() {
            this.inputs.priceSell = 0;
            this.inputs.amount = 0;
        }
    },
    mounted() {
        this.modal = new Modal(this.$refs.modal);
        this.$refs.modal.addEventListener('hidden.bs.modal', this.hiddenBsModal);
    }
}
</script>