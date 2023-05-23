<template>
    <div class="modal fade" ref="modal" tabindex="-1" aria-labelledby="formModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="formModalLabel">Tambah Saldo</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
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
import addBalanceIn from '@/methods/api/store';
import editBalanceIn from '@/methods/api/update';

export default {
    props: ['toastStatus'],
    emits: ["pushToast", 'loadData'],
    data() {
        return {
            data: {
                balanceInId: null,
            },
            inputs: {
                amount: 0,
                priceBuy: 0,
            },
            modal: null,
            endpoint: 'balance-in'
        }
    },
    methods: {
        addBalanceIn,
        editBalanceIn,
        openModal(balanceIn = null) {
            if (balanceIn) {
                this.data.balanceInId = balanceIn.id;
                this.inputs.priceBuy = balanceIn.price_buy;
                this.inputs.amount = balanceIn.amount;
            }
            this.modal.show();
        },
        async submit() {
            let response = null;
            if (this.data.balanceInId) {
                response = await this.editBalanceIn(
                    this.endpoint,
                    this.data.balanceInId,
                    {
                        balance_id: 1,
                        price_buy: this.inputs.priceBuy,
                        amount: this.inputs.amount,
                    });

                if (response.data.success)
                    this.$emit(
                        'pushToast',
                        this.toastStatus.success,
                        'Berhasil memperbaharui saldo!'
                    );
                else
                    this.$emit(
                        'pushToast',
                        this.toastStatus.failed,
                        'Gagal memperbaharui saldo!'
                    );
            } else {
                response = await this.addBalanceIn(
                    this.endpoint,
                    {
                        balance_id: 1,
                        price_buy: this.inputs.priceBuy,
                        amount: this.inputs.amount,
                    });

                if (response.data.success)
                    this.$emit(
                        'pushToast',
                        this.toastStatus.success,
                        'Berhasil menambah saldo!'
                    );
                else
                    this.$emit(
                        'pushToast',
                        this.toastStatus.failed,
                        'Gagal menambah saldo!'
                    );
            }

            this.$emit('loadData');
            this.modal.hide();
        },
        hiddenBsModal() {
            this.data.balanceInId = null;
            this.inputs.priceBuy = 0;
            this.inputs.amount = 0;
        }
    },
    mounted() {
        this.modal = new Modal(this.$refs.modal);
        console.log()
        this.$refs.modal.addEventListener('hidden.bs.modal', this.hiddenBsModal);
    }
}
</script>