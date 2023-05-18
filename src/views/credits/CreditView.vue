<template>
    <div class="layout-page">

        <Navbar />

        <div class="content-wrapper">

            <div class="container-xxl flex-grow-1 container-p-y">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h4 class="fw-bold">Pulsa</h4>
                    <button class="btn btn-primary align-self-start" @click="formModal(false, credit.name)">Tambah</button>
                </div>

                <div class="row">
                    <div class="col-12">
                        <div class="nav-align-top mb-4">
                            <ul class="nav nav-tabs" role="tablist">
                                <li class="nav-item" v-for="(credit, index) in credit.data.credits" :key="credit.id">
                                    <button type="button" class="nav-link" :class="{ 'active': !index }" role="tab"
                                        data-bs-toggle="tab" :data-bs-target="`#credit-${credit.id}`"
                                        :aria-controls="`credit-${credit.id}`" aria-selected="true">
                                        {{ credit.name }}
                                    </button>
                                </li>
                            </ul>
                            <div class="tab-content">
                                <div class="tab-pane fade" :class="{ 'show active': !index }" :id="`credit-${value.id}`"
                                    role="tabpanel" v-for="(value, index) in credit.data.credits" :key="credit.id">
                                    <div class="row">
                                        <div class="col-12 col-md-4 m-auto">
                                            <h5 class="mb-0">Balance: {{ value.balance }}</h5>
                                        </div>
                                        <div class="col-12 col-md-8 d-flex justify-content-end gap-2">
                                            <!-- <button class="btn btn-info btn-sm" @click="">Tambah Ballance</button> -->
                                            <button class="btn btn-primary btn-sm"
                                                @click="formModal(false, creditPrice.name, value.id)">Tambah</button>
                                            <button class="btn btn-warning btn-sm"
                                                @click="formModal(value.id, credit.name)">
                                                Edit
                                            </button>
                                            <button class="btn btn-danger btn-sm"
                                                @click="deleteData(value.id, credit.name)">
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
                                                    <th class="py-3 text-center">Harga</th>
                                                    <th class="py-3 text-center">Jumlah</th>
                                                    <th class="py-3 text-center">Aksi</th>
                                                </tr>
                                            </thead>
                                            <tbody class="table-border-bottom-0">
                                                <tr v-for="valueCreditPrice in creditPrice.data.creditPrices[value.id]"
                                                    v-if="credit.data.credits.length">
                                                    <td class="text-center">{{ valueCreditPrice.price }}</td>
                                                    <td class="text-center">{{ valueCreditPrice.amount }}</td>
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
                    </div>
                </div>
            </div>
        </div>
    </div>

    <FormModal ref="creditModal">
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
    </FormModal>
    <FormModal ref="creditPriceModal">
        <form>
            <div class="mb-3">
                <label class="form-label">Harga</label>
                <input type="number" v-model="creditPrice.inputs.price" class="form-control" required min="0">
            </div>
            <div class="mb-3">
                <label class="form-label">Jumlah</label>
                <input type="number" v-model="creditPrice.inputs.amount" class="form-control" required min="0">
            </div>
            <div class="mb-3">
                <label class="form-label">Urutan</label>
                <input type="number" v-model="creditPrice.inputs.order" class="form-control" required min="1">
            </div>
            <div class="mb-3">
                <button @click.prevent="submitForm(creditPrice.name)" class="btn btn-primary float-end">Submit</button>
            </div>
        </form>
    </FormModal>
</template>
<script>
import FormModal from '@/components/Modal.vue';
import Navbar from '@/components/Navbar.vue';

// API
import getData from '@/methods/api/index';
import addData from '@/methods/api/store';
import editData from '@/methods/api/update';
import getDataById from '@/methods/api/show';
import destroy from '@/methods/api/destroy';

import { Modal } from 'bootstrap';
export default {
    components: {
        FormModal,
        Navbar,
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
    methods: {
        getData,
        addData,
        editData,
        getDataById,
        destroy,
        async deleteData(id, name, creditId = null) {
            if (name === this.credit.name) {
                await this.destroy(this.credit.endpoint, id);
                this.loadData(name);
            }

            if (name === this.creditPrice.name && creditId) {
                await this.destroy(this.creditPrice.endpoint, id);
                this.loadData(name, creditId);
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
                } else {
                    response = await this.addData(
                        this.credit.endpoint,
                        {
                            name: this.credit.inputs.name,
                            order: this.credit.inputs.order,
                        }
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
        async loadData(name, creditId = null) {
            if (name === this.credit.name) {
                this.credit.data.credits = await this.getData(this.credit.endpoint);
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