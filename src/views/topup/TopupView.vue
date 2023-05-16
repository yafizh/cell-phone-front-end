<template>
    <div class="layout-page" style="padding-left: 16rem;">

        <Navbar />

        <div class="content-wrapper">

            <div class="container-xxl flex-grow-1 container-p-y">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h4 class="fw-bold">Topup</h4>
                    <button class="btn btn-primary align-self-start" @click="formModal(false, topup.name)">Tambah</button>
                </div>

                <div class="row">
                    <div class="col-12">
                        <div class="nav-align-top mb-4">
                            <ul class="nav nav-tabs" role="tablist">
                                <li class="nav-item" v-for="(value, index) in topup.data.topups" :key="value.id">
                                    <button type="button" class="nav-link" :class="{ 'active': !index }" role="tab"
                                        data-bs-toggle="tab" :data-bs-target="`#topup-${value.id}`"
                                        :aria-controls="`topup-${value.id}`" aria-selected="true">
                                        {{ value.name }}
                                    </button>
                                </li>
                            </ul>
                            <div class="tab-content">
                                <div class="tab-pane fade" :class="{ 'show active': !index }" :id="`topup-${value.id}`"
                                    role="tabpanel" v-for="(value, index) in topup.data.topups" :key="topup.id">
                                    <div class="row">
                                        <div class="col-12 col-md-4 m-auto">
                                            <h5 class="mb-0">Balance: {{ value.balance }}</h5>
                                        </div>
                                        <div class="col-12 col-md-8 d-flex justify-content-end gap-2">
                                            <!-- <button class="btn btn-info btn-sm" @click="">Tambah Ballance</button> -->
                                            <button class="btn btn-primary btn-sm"
                                                @click="formModal(false, topupPrice.name, value.id)">Tambah</button>
                                            <button class="btn btn-warning btn-sm" @click="formModal(value.id, topup.name)">
                                                Edit
                                            </button>
                                            <button class="btn btn-danger btn-sm" @click="deleteData(value.id, topup.name)">
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
                                                <tr v-for="valueTopupPrice in topupPrice.data.topupPrices[value.id]"
                                                    v-if="topup.data.topups.length">
                                                    <td class="text-center">{{ valueTopupPrice.price }}</td>
                                                    <td class="text-center">{{ valueTopupPrice.amount }}</td>
                                                    <td class="text-center td-fit">
                                                        <div class="d-flex gap-2">
                                                            <button class="btn btn-warning btn-sm"
                                                                @click="formModal(valueTopupPrice.id, topupPrice.name, value.id)">Edit</button>
                                                            <button class="btn btn-danger btn-sm"
                                                                @click="deleteData(valueTopupPrice.id, topupPrice.name, value.id)">
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

    <FormModal ref="topupModal">
        <form>
            <div class="mb-3">
                <label class="form-label">Nama</label>
                <input type="text" v-model="topup.inputs.name" class="form-control" required>
            </div>
            <div class="mb-3">
                <label class="form-label">Urutan</label>
                <input type="number" v-model="topup.inputs.order" class="form-control" required min="1">
            </div>
            <div class="mb-3">
                <button @click.prevent="submitForm(topup.name)" class="btn btn-primary float-end">Submit</button>
            </div>
        </form>
    </FormModal>
    <FormModal ref="topupPriceModal">
        <form>
            <div class="mb-3">
                <label class="form-label">Harga</label>
                <input type="number" v-model="topupPrice.inputs.price" class="form-control" required min="0">
            </div>
            <div class="mb-3">
                <label class="form-label">Jumlah</label>
                <input type="number" v-model="topupPrice.inputs.amount" class="form-control" required min="0">
            </div>
            <div class="mb-3">
                <label class="form-label">Urutan</label>
                <input type="number" v-model="topupPrice.inputs.order" class="form-control" required min="1">
            </div>
            <div class="mb-3">
                <button @click.prevent="submitForm(topupPrice.name)" class="btn btn-primary float-end">Submit</button>
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
            topup: {
                data: {
                    topups: [],
                    modal: null,
                    topupId: null,
                },
                inputs: {
                    name: '',
                    order: '',
                },
                name: 'TOPUP',
                endpoint: 'topups',
            },
            topupPrice: {
                data: {
                    topupPrices: {},
                    modal: null,
                    topupPriceId: null,
                },
                inputs: {
                    topupId: '',
                    amount: '',
                    price: '',
                    order: '',
                },
                name: 'TOPUP PRICES',
                endpoint: 'topup-prices'
            },
        }
    },
    methods: {
        getData,
        addData,
        editData,
        getDataById,
        destroy,
        async deleteData(id, name, topupId = null) {
            if (name === this.topup.name) {
                await this.destroy(this.topup.endpoint, id);
                this.loadData(name);
            }

            if (name === this.topupPrice.name && topupId) {
                await this.destroy(this.topupPrice.endpoint, id);
                this.loadData(name, topupId);
            }

        },
        async formModal(id, name, topupId = null) {
            if (name === this.topup.name) {
                this.topup.data.topupId = null;
                if (id) {
                    this.topup.data.topupId = id;
                    const response = await this.getDataById(this.topup.endpoint, id);

                    if (response.status === 200) {
                        this.topup.inputs.name = response.data.name;
                        this.topup.inputs.order = response.data.order;
                    }
                }
                this.topup.data.modal.show();
                return;
            }

            if (name === this.topupPrice.name && topupId) {
                this.topupPrice.data.topupPriceId = null;
                this.topupPrice.inputs.topupId = topupId;
                if (id) {
                    this.topupPrice.data.topupPriceId = id;
                    const response = await this.getDataById(this.topupPrice.endpoint, id);

                    if (response.status === 200) {
                        this.topupPrice.inputs.amount = response.data.amount;
                        this.topupPrice.inputs.price = response.data.price;
                        this.topupPrice.inputs.order = response.data.order;
                    }
                }
                this.topupPrice.data.modal.show();
                return;
            }
        },
        async submitForm(name) {
            let response = null;

            if (name === this.topup.name) {
                if (this.topup.data.topupId) {
                    response = await this.editData(
                        this.topup.endpoint,
                        this.topup.data.topupId,
                        {
                            name: this.topup.inputs.name,
                            order: this.topup.inputs.order,
                        }
                    );
                } else {
                    response = await this.addData(
                        this.topup.endpoint,
                        {
                            name: this.topup.inputs.name,
                            order: this.topup.inputs.order,
                        }
                    );
                }

                this.loadData(name);
                this.topup.data.modal.hide();
                this.topup.inputs.name = '';
                this.topup.inputs.order = '';
                console.log(response);
                return;
            }

            if (name === this.topupPrice.name) {
                if (this.topupPrice.data.topupPriceId) {
                    response = await this.editData(
                        this.topupPrice.endpoint,
                        this.topupPrice.data.topupPriceId,
                        {
                            topup_id: this.topupPrice.inputs.topupId,
                            amount: this.topupPrice.inputs.amount,
                            price: this.topupPrice.inputs.price,
                            order: this.topupPrice.inputs.order,
                        }
                    );
                } else {
                    response = await this.addData(
                        this.topupPrice.endpoint,
                        {
                            topup_id: this.topupPrice.inputs.topupId,
                            amount: this.topupPrice.inputs.amount,
                            price: this.topupPrice.inputs.price,
                            order: this.topupPrice.inputs.order,
                        }
                    );
                }

                this.loadData(name, this.topupPrice.inputs.topupId);
                this.topupPrice.data.modal.hide();
                this.topupPrice.inputs.topupId = '';
                this.topupPrice.inputs.amount = '';
                this.topupPrice.inputs.price = '';
                this.topupPrice.inputs.order = '';
                return;
            }
        },
        async loadData(name, topupId = null) {
            if (name === this.topup.name) {
                this.topup.data.topups = await this.getData(this.topup.endpoint);
                return;
            }

            if (name === this.topupPrice.name && topupId) {
                this.topupPrice.data.topupPrices[topupId] = await this.getData(
                    this.topupPrice.endpoint,
                    { topup_id: topupId }
                );
                return;
            }
        },
    },
    async mounted() {
        this.topup.data.modal = new Modal(this.$refs.topupModal.$refs.modal);
        this.topupPrice.data.modal = new Modal(this.$refs.topupPriceModal.$refs.modal);
        await this.loadData(this.topup.name);

        if (this.topup.data.topups.length) {
            await this.loadData(this.topupPrice.name, this.topup.data.topups[0].id);
        }

    },
}
</script>