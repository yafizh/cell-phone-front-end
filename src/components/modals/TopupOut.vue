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
                            <label class="form-label">Saldo</label>
                            <select v-model="inputs.amount" @change="setPrice" class="form-control" required>
                                <option :value="topupPrice.amount" v-for="topupPrice in data.topupPrices"
                                    :key="topupPrice.id">
                                    {{ numberWithDot(topupPrice.amount) }}
                                </option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Harga Jual</label>
                            <input type="text" :value="numberWithDot(inputs.priceSell)" class="form-control" disabled>
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

// Methods
import numberWithDot from '@/methods/number/formatter';

export default {
    props: ['name', 'topupPrices', 'toastStatus'],
    emits: ["pushToast", "loadData"],
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
        numberWithDot,
        addTopupOut,
        editTopupOut,
        getTopupOutById,
        setPrice(event) {
            this.inputs.priceSell = this.data.topupPrices[event.target.selectedIndex].price;
        },
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

                if (response.data.success)
                    this.$emit(
                        'pushToast',
                        this.toastStatus.success,
                        'Berhasil memperbaharui penjualan topup!'
                    );
                else
                    this.$emit(
                        'pushToast',
                        this.toastStatus.failed,
                        'Gagal memperbaharui penjualan topup!'
                    );
                this.$emit('loadData');
            } else {
                response = await this.addTopupOut(
                    this.endpoint,
                    {
                        topup_id: this.data.topupId,
                        price_sell: this.inputs.priceSell,
                        amount: this.inputs.amount,
                    });

                if (response.data.success)
                    this.$emit(
                        'pushToast',
                        this.toastStatus.success,
                        'Berhasil menambah penjualan topup!'
                    );
                else
                    this.$emit(
                        'pushToast',
                        this.toastStatus.failed,
                        'Gagal menambah penjualan topup!'
                    );
                this.$emit('loadBalance');
            }

            this.modal.hide();
        },
        hiddenBsModal() {
            this.data.topupOutId = null;
            this.data.topupId = null;
            this.data.name = '';
            this.data.topupPrices = [];
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