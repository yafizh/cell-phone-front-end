<template>
    <div class="layout-page">

        <Navbar />

        <div class="content-wrapper">

            <div class="container-xxl flex-grow-1 container-p-y">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h4 class="fw-bold">Data Pegawai</h4>
                    <button class="btn btn-primary align-self-start" @click="formModal(false)">Tambah</button>
                </div>

                <div class="card">
                    <div class="table-responsive text-nowrap">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th class="py-3 text-center">Username</th>
                                    <th class="py-3 text-center">Nama</th>
                                    <th class="py-3 text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody class="table-border-bottom-0">
                                <tr v-for="employee in data.employees" :key="employee.id">
                                    <td class="text-center">{{ employee.username }}</td>
                                    <td class="text-center">{{ employee.name }}</td>
                                    <td class="text-center td-fit">
                                        <div class="d-flex gap-2">
                                            <button @click="formModal(employee.id)" class="btn btn-warning btn-sm">Edit</button>
                                            <button @click="deleteEmployee(employee.id)"
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
                <label class="form-label">Nama Lengkap</label>
                <input type="text" v-model="inputs.name" class="form-control" required autocomplete="username">
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
import getEmployees from '@/methods/api/index';
import addEmployee from '@/methods/api/store';
import editEmployee from '@/methods/api/update';
import getEmployeeById from '@/methods/api/show';
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
                employees: [],
                modal: null,
                employeeId: null,
            },
            inputs: {
                name: '',
                username: '',
                password: ''
            },
            endpoint: 'employees'
        }
    },
    methods: {
        getEmployees,
        addEmployee,
        editEmployee,
        getEmployeeById,
        destroy,
        async deleteEmployee(employeeId){
            await this.destroy(this.endpoint, employeeId);
            this.loadData();
        },
        async formModal(employeeId) {
            this.data.employeeId = null;
            if (employeeId) {
                this.data.employeeId = employeeId;
                const response = await this.getEmployeeById(this.endpoint, employeeId);

                if (response.status === 200) {
                    this.inputs.name = response.data.name;
                    this.inputs.username = response.data.username;
                    this.inputs.password = response.data.password;
                }
            }
            this.data.modal.show();
        },
        async submitForm() {
            if (this.data.employeeId) {
                await this.editEmployee(this.endpoint, this.data.employeeId, {
                    name: this.inputs.name,
                    username: this.inputs.username,
                    password: this.inputs.password,
                });
            } else {
                await this.addEmployee(this.endpoint, {
                    name: this.inputs.name,
                    username: this.inputs.username,
                    password: this.inputs.password,
                });
            }

            this.loadData();
            this.data.modal.hide();
            this.inputs.name = '';
            this.inputs.username = '';
            this.inputs.password = '';
        },
        async loadData() {
            this.data.employees = await this.getEmployees(this.endpoint);
        }
    },
    async mounted() {
        this.data.modal = new Modal(this.$refs.modal.$refs.modal)
        this.loadData();
    },
}
</script>