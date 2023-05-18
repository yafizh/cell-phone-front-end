<template>
    <div class="layout-page">

        <Navbar />

        <div class="content-wrapper">

            <div class="container-xxl flex-grow-1 container-p-y">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h4 class="fw-bold">Data Admin</h4>
                    <button class="btn btn-primary align-self-start" @click="formModal(false)">Tambah</button>
                </div>

                <div class="card">
                    <div class="table-responsive text-nowrap">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th class="py-3 text-center">Username</th>
                                    <th class="py-3 text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody class="table-border-bottom-0">
                                <tr v-for="user in data.users" :key="user.id">
                                    <td class="text-center">{{ user.username }}</td>
                                    <td class="text-center td-fit">
                                        <div class="d-flex gap-2">
                                            <button @click="formModal(user.id)" class="btn btn-warning btn-sm">Edit</button>
                                            <button @click="deleteUser(user.id)"
                                                class="btn btn-danger btn-sm">Hapus</button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <FormModal ref="modal">
        <form>
            <div class="mb-3">
                <label class="form-label">Username</label>
                <input type="text" v-model="inputs.username" class="form-control" required autocomplete="username">
            </div>
            <div class="mb-3">
                <label class="form-label">Password</label>
                <input type="password" v-model="inputs.password" class="form-control" required autocomplete="new-password">
            </div>
            <div class="mb-3">
                <button @click.prevent="submitForm" class="btn btn-primary float-end">Submit</button>
            </div>
        </form>
    </FormModal>
</template>
<script>
import FormModal from '@/components/Modal.vue';
import Navbar from '@/components/Navbar.vue';

// API
import getUser from '@/methods/api/index';
import addUser from '@/methods/api/store';
import editUser from '@/methods/api/update';
import getUserById from '@/methods/api/show';
import destroy from '@/methods/api/destroy';

import { Modal } from 'bootstrap';
export default {
    components: {
        FormModal,
        Navbar,
    },
    data() {
        return {
            data: {
                users: [],
                modal: null,
                userId: null,
            },
            inputs: {
                username: '',
                password: ''
            },
            endpoint: 'admin'
        }
    },
    methods: {
        getUser,
        addUser,
        editUser,
        getUserById,
        destroy,
        async deleteUser(userId){
            await this.destroy(this.endpoint, userId);
            this.loadData();
        },
        async formModal(userId) {
            this.data.userId = null;
            if (userId) {
                this.data.userId = userId;
                const response = await this.getUserById(this.endpoint, userId);

                if (response.status === 200) {
                    this.inputs.username = response.data.username;
                    this.inputs.password = response.data.password;
                }
            }
            this.data.modal.show();
        },
        async submitForm() {
            if (this.data.userId) {
                await this.editUser(this.endpoint, this.data.userId, {
                    username: this.inputs.username,
                    password: this.inputs.password,
                });
            } else {
                await this.addUser(this.endpoint, {
                    username: this.inputs.username,
                    password: this.inputs.password,
                });
            }

            this.loadData();
            this.data.modal.hide();
            this.inputs.username = '';
            this.inputs.password = '';
        },
        async loadData() {
            this.data.users = await this.getUser(this.endpoint);
        }
    },
    async mounted() {
        this.data.modal = new Modal(this.$refs.modal.$refs.modal)
        this.loadData();
    },
}
</script>