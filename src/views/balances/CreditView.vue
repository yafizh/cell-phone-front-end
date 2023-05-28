<template>
    <h4>Pulsa</h4>
    <div class="nav-align-top mb-4">
        <ul class="nav nav-tabs" role="tablist">
            <li class="nav-item" v-for="(credit, index) in credit.data.credits" :key="credit.id">
                <button type="button" class="nav-link" :class="{ 'active': !index }" role="tab" data-bs-toggle="tab"
                    :data-bs-target="`#credit-${credit.id}`" :aria-controls="`credit-${credit.id}`" aria-selected="true">
                    {{ credit.name }}
                </button>
            </li>
            <li class="nav-item">
                <button type="button" class="nav-link" @click="formModal(false, credit.name)" title="Tambah Provider">
                    +
                </button>
            </li>
        </ul>
        <div class="tab-content">
            <div class="tab-pane fade" :class="{ 'show active': !index }" :id="`credit-${value.id}`" role="tabpanel"
                v-for="(value, index) in credit.data.credits" :key="credit.id">
                <div class="row">
                    <div class="col-12 d-flex justify-content-end gap-2">
                        <button class="btn btn-primary btn-sm"
                            @click="creditOut(value, creditPrice.data.creditPrices[value.id])">
                            Saldo Keluar
                        </button>
                        |
                        <button class="btn btn-primary btn-sm" @click="formModal(false, creditPrice.name, value.id)">
                            Tambah Daftar Harga
                        </button>
                        |
                        <button class="btn btn-warning btn-sm" @click="formModal(value.id, credit.name)">
                            Edit
                        </button>
                        <button class="btn btn-danger btn-sm" @click="deleteData(value.id, credit.name)">
                            Hapus
                        </button>
                    </div>
                </div>
                <hr>
                <p class="mb-0">
                <div class="table-responsive text-nowrap">
                    <table class="table">
                        <thead>
                            <tr>
                                <th class="py-3 text-center">Saldo</th>
                                <th class="py-3 text-center">Harga</th>
                                <th class="py-3 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody class="table-border-bottom-0">
                            <tr v-for="valueCreditPrice in creditPrice.data.creditPrices[value.id]"
                                v-if="credit.data.credits.length">
                                <td class="text-center">{{ numberWithDot(valueCreditPrice.amount) }}</td>
                                <td class="text-center">{{ numberWithDot(valueCreditPrice.price) }}</td>
                                <td class="text-center td-fit">
                                    <div class="d-flex gap-2">
                                        <button class="btn btn-warning btn-sm"
                                            @click="formModal(valueCreditPrice.id, creditPrice.name, value.id)">Edit</button>
                                        <button class="btn btn-danger btn-sm"
                                            @click="deleteData(valueCreditPrice.id, creditPrice.name, value.id)">
                                            Hapus
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                </p>
            </div>
        </div>
    </div>

    <FormModal ref="creditModal">
        <template #title>
            Pulsa
        </template>
        <template #body>
            <form>
                <div class="mb-3">
                    <label class="form-label">Nama Provider</label>
                    <input type="text" v-model="credit.inputs.name" class="form-control" required>
                </div>
                <div class="mb-3">
                    <label class="form-label">Urutan</label>
                    <input type="number" v-model="credit.inputs.order" class="form-control" required min="1">
                </div>
                <div class="mb-3">
                    <button @click.prevent="submitForm(credit.name)" class="btn btn-primary float-end">Submit</button>
                </div>
            </form>
        </template>
    </FormModal>
    <FormModal ref="creditPriceModal">
        <template #title>
            Daftar Harga Pulsa
        </template>
        <template #body>
            <form>
                <div class="mb-3">
                    <label class="form-label">Saldo</label>
                    <input type="text" @keydown.prevent="inputAmount" :value="amount" class="form-control" required min="0">
                </div>
                <div class="mb-3">
                    <label class="form-label">Harga</label>
                    <input ref="price" type="text" @keydown.prevent="inputPrice" :value="price" class="form-control" required min="0">
                </div>
                <div class="mb-3">
                    <label class="form-label">Urutan</label>
                    <input ref="order" type="number" v-model="creditPrice.inputs.order" class="form-control" required min="1">
                </div>
                <div class="mb-3">
                    <button @click.prevent="submitForm(creditPrice.name)" class="btn btn-primary float-end">Submit</button>
                </div>
            </form>
        </template>
    </FormModal>

    <ModalCreditOut ref="modalCreditOut" @loadBalance="loadBalance" :name="credit.name" :toastStatus="toastStatus"
        @pushToast="pushToast" />
</template>
<script>
import FormModal from '@/components/Modal.vue';
import ModalCreditOut from '@/components/modals/CreditOut.vue';

// API
import getData from '@/methods/api/index';
import getDataById from '@/methods/api/show';
import addData from '@/methods/api/store';
import editData from '@/methods/api/update';
import destroy from '@/methods/api/destroy';

// Methods
import numberWithDot from '@/methods/number/formatter';

import { Modal } from 'bootstrap';
export default {
    props: ['toastStatus'],
    emits: ["pushToast", 'loadBalance'],
    components: {
        FormModal,
        ModalCreditOut,
    },
    data() {
        return {
            credit: {
                data: {
                    credits: [],
                    modal: null,
                    creditId: null,
                },
                inputs: {
                    name: '',
                    order: '',
                },
                name: 'CREDIT',
                endpoint: 'credits',
            },
            creditPrice: {
                data: {
                    creditPrices: {},
                    modal: null,
                    creditPriceId: null,
                },
                inputs: {
                    creditId: '',
                    amount: '',
                    price: '',
                    order: '',
                },
                name: 'CREDIT PRICES',
                endpoint: 'credit-prices'
            },
        }
    },
    computed: {
        price(){
            return this.numberWithDot(this.creditPrice.inputs.price);
        },
        amount(){
            return this.numberWithDot(this.creditPrice.inputs.amount);
        }
    },
    methods: {
        numberWithDot,
        getData,
        getDataById,
        addData,
        editData,
        destroy,
        inputAmount(event) {
            if(event.which == 9) {
                this.$refs.price.focus();
                return;
            }

            if(event.which == 13){
                this.submitForm(this.creditPrice.name);
                return;
            }

            if (event.which == 8) {
                this.creditPrice.inputs.amount =
                    this.creditPrice.inputs.amount.toString().substring(
                        0,
                        this.creditPrice.inputs.amount.toString().length - 1
                    );
                return;
            }

            if (event.which < 48 || event.which > 57) {
                return;
            }

            this.creditPrice.inputs.amount += event.key;
        },
        inputPrice(event) {
            if(event.which == 9) {
                this.$refs.order.focus();
                return;
            }

            if(event.which == 13){
                this.submitForm(this.creditPrice.name);
                return;
            }

            if (event.which == 8) {
                this.creditPrice.inputs.price =
                    this.creditPrice.inputs.price.toString().substring(
                        0,
                        this.creditPrice.inputs.price.toString().length - 1
                    );
                return;
            }

            if (event.which < 48 || event.which > 57) {
                return;
            }

            this.creditPrice.inputs.price += event.key;
        },
        pushToast(status, message) {
            this.$emit('pushToast', status, message);
        },
        loadBalance() {
            this.$emit('loadBalance');
        },
        async deleteData(id, name, creditId = null) {
            if (name === this.credit.name) {
                const response = await this.destroy(this.credit.endpoint, id);
                this.loadData(name);


                if (response.data.success)
                    this.pushToast(
                        this.toastStatus.success,
                        'Berhasil menghapus provider pulsa!'
                    );
                else
                    this.pushToast(
                        this.toastStatus.failed,
                        'Gagal menghapus provider pulsa!'
                    );
            }

            if (name === this.creditPrice.name && creditId) {
                const response = await this.destroy(this.creditPrice.endpoint, id);
                this.loadData(name, creditId);


                if (response.data.success)
                    this.pushToast(
                        this.toastStatus.success,
                        'Berhasil menghapus daftar harga!'
                    );
                else
                    this.pushToast(
                        this.toastStatus.failed,
                        'Gagal menghapus daftar harga!'
                    );
            }

        },
        async formModal(id, name, creditId = null) {
            if (name === this.credit.name) {
                this.credit.data.creditId = null;
                if (id) {
                    this.credit.data.creditId = id;
                    const response = await this.getDataById(this.credit.endpoint, id);

                    if (response.status === 200) {
                        this.credit.inputs.name = response.data.name;
                        this.credit.inputs.order = response.data.order;
                    }
                }
                this.credit.data.modal.show();
                return;
            }

            if (name === this.creditPrice.name && creditId) {
                this.creditPrice.data.creditPriceId = null;
                this.creditPrice.inputs.creditId = creditId;
                if (id) {
                    this.creditPrice.data.creditPriceId = id;
                    const response = await this.getDataById(this.creditPrice.endpoint, id);

                    if (response.status === 200) {
                        this.creditPrice.inputs.amount = response.data.amount;
                        this.creditPrice.inputs.price = response.data.price;
                        this.creditPrice.inputs.order = response.data.order;
                    }
                }
                this.creditPrice.data.modal.show();
                return;
            }
        },
        async submitForm(name) {
            let response = null;

            if (name === this.credit.name) {
                if (this.credit.data.creditId) {
                    response = await this.editData(
                        this.credit.endpoint,
                        this.credit.data.creditId,
                        {
                            name: this.credit.inputs.name,
                            order: this.credit.inputs.order,
                        }
                    );

                    if (response.data.success)
                        this.pushToast(
                            this.toastStatus.success,
                            'Berhasil memperbaharui provider pulsa!'
                        );
                    else
                        this.pushToast(
                            this.toastStatus.failed,
                            'Gagal memperbaharui provider pulsa!'
                        );
                } else {
                    response = await this.addData(
                        this.credit.endpoint,
                        {
                            balance_id: 1,
                            name: this.credit.inputs.name,
                            order: this.credit.inputs.order,
                        }
                    );

                    if (response.data.success)
                        this.pushToast(
                            this.toastStatus.success,
                            'Berhasil menambah provider pulsa!'
                        );
                    else
                        this.pushToast(
                            this.toastStatus.failed,
                            'Gagal menambah provider pulsa!'
                        );
                }

                this.loadData(name);
                this.credit.data.modal.hide();
                this.credit.inputs.name = '';
                this.credit.inputs.order = '';
                return;
            }

            if (name === this.creditPrice.name) {
                if (this.creditPrice.data.creditPriceId) {
                    response = await this.editData(
                        this.creditPrice.endpoint,
                        this.creditPrice.data.creditPriceId,
                        {
                            credit_id: this.creditPrice.inputs.creditId,
                            amount: this.creditPrice.inputs.amount,
                            price: this.creditPrice.inputs.price,
                            order: this.creditPrice.inputs.order,
                        }
                    );

                    if (response.data.success)
                        this.pushToast(
                            this.toastStatus.success,
                            'Berhasil memperbaharui daftar harga!'
                        );
                    else
                        this.pushToast(
                            this.toastStatus.failed,
                            'Gagal memperbaharui daftar harga!'
                        );
                } else {
                    response = await this.addData(
                        this.creditPrice.endpoint,
                        {
                            credit_id: this.creditPrice.inputs.creditId,
                            amount: this.creditPrice.inputs.amount,
                            price: this.creditPrice.inputs.price,
                            order: this.creditPrice.inputs.order,
                        }
                    );

                    if (response.data.success)
                        this.pushToast(
                            this.toastStatus.success,
                            'Berhasil menambah daftar harga!'
                        );
                    else
                        this.pushToast(
                            this.toastStatus.failed,
                            'Gagal menambah daftar harga!'
                        );
                }

                this.loadData(name, this.creditPrice.inputs.creditId);
                this.creditPrice.data.modal.hide();
                this.creditPrice.inputs.creditId = '';
                this.creditPrice.inputs.amount = '';
                this.creditPrice.inputs.price = '';
                this.creditPrice.inputs.order = '';
                return;
            }
        },
        async creditOut(credit, creditPrices) {
            this.$refs.modalCreditOut.openModal(credit, creditPrices);
        },
        async loadData(name, creditId = null) {
            if (name === this.credit.name) {
                this.credit.data.credits = await this.getData(
                    this.credit.endpoint,
                    { balance_id: 1 }
                );
                return;
            }

            if (name === this.creditPrice.name && creditId) {
                this.creditPrice.data.creditPrices[creditId] = await this.getData(
                    this.creditPrice.endpoint,
                    { credit_id: creditId }
                );
                return;
            }
        },
    },
    async mounted() {
        this.credit.data.modal = new Modal(this.$refs.creditModal.$refs.modal);
        this.creditPrice.data.modal = new Modal(this.$refs.creditPriceModal.$refs.modal);
        await this.loadData(this.credit.name);

        if (this.credit.data.credits.length) {
            await this.loadData(this.creditPrice.name, this.credit.data.credits[0].id);
        }
    },
}
</script>