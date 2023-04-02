<template>
    <section class="main_content dashboard_part">
        <div class="main_content_iner">
            <div class="container-fluid plr_30 body_white_bg pt_30">
                <div class="row justify-content-center">
                    <div class="col-12">
                        <div class="QA_section">
                            <div class="white_box_tittle list_header">
                                <h4>Data Pegawai</h4>
                                <div class="box_right d-flex lms_block">
                                    <div class="serach_field_2">
                                        <div class="search_inner">
                                            <form Active="#">
                                                <div class="search_field">
                                                    <input type="text" placeholder="Search content here..." />
                                                </div>
                                                <button type="submit">
                                                    <i class="ti-search"></i>
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                    <div class="add_button ms-2">
                                        <button type="button" class="btn_1" @click="formModal(null)">
                                            Tambah Pegawai
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="QA_table mb-5">
                                <table class="table lms_table_active">
                                    <thead>
                                        <tr>
                                            <!-- <th scope="col" class="text-center td-fit">No</th> -->
                                            <th scope="col" class="text-center">Username</th>
                                            <th scope="col" class="text-center">Nama</th>
                                            <th scope="col" class="text-center td-fit">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-if="!data.employees.length">
                                            <td colspan="3" class="text-center">Data Kosong</td>
                                        </tr>
                                        <tr v-for="employee in data.employees">
                                            <!-- <td class="text-center td-fit">{{ employee.no }}</td> -->
                                            <td class="text-center">{{ employee.name }}</td>
                                            <td class="text-center">{{ employee.username }}</td>
                                            <td class="td-fit">
                                                <button class="btn mx-1 btn-sm btn-warning" @click="formModal(employee.id)">
                                                    Edit
                                                </button>
                                                <button class="btn mx-1 btn-sm btn-danger"
                                                    @click="deleteEmployee(employee.id)">
                                                    Hapus
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="col-lg-12">
                        <div class="white_box mb_30">
                            <nav aria-label="Page navigation example">
                                <ul class="pagination justify-content-end">
                                    <li class="page-item disabled">
                                        <a class="page-link" href="#" tabindex="-1" aria-disabled="true">Previous</a>
                                    </li>
                                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                                    <li class="page-item">
                                        <a class="page-link" href="#">Next</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div> -->
                </div>
            </div>
        </div>
    </section>

    <FormModal ref="modal">
        <form>
            <div class="mb-3">
                <label class="form-label">Nama Pegawai</label>
                <input type="text" v-model="inputs.name" class="form-control" required autocomplete="username">
            </div>
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
import { Modal } from 'bootstrap';
export default {
    components: {
        FormModal,
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
            }
        }
    },
    methods: {
        add(employee) {
            this.data.employees.push(employee)
        },
        addEmployee() {
            const emplyoee = {
                id: 1,
                name: this.inputs.name,
                username: this.inputs.username,
                password: this.inputs.password,
            };

            this.add(emplyoee)
            this.data.modal.hide()
            this.inputs.name = '';
            this.inputs.username = '';
            this.inputs.password = '';
        },
        updateEmployee() {
            const employee = {
                id: 1,
                name: this.inputs.name,
                username: this.inputs.username,
                password: this.inputs.password,
            };

            this.data.employees[0] = employee
            this.data.modal.hide()
            this.inputs.name = ''
            this.inputs.username = ''
            this.inputs.password = ''
        },
        deleteEmployee(employeeId) {
            this.data.employees = [];
        },
        formModal(employeeId) {
            this.data.employeeId = employeeId
            if (employeeId) {
                this.inputs.name = this.data.employees[0].name;
                this.inputs.username = this.data.employees[0].username;
                this.inputs.password = this.data.employees[0].password;
            }
            this.data.modal.show()
        },
        submitForm() {
            this.data.employeeId ? this.updateEmployee() : this.addEmployee()
        }

    },
    mounted() {
        this.data.modal = new Modal(this.$refs.modal.$refs.modal)
    }
}
</script>