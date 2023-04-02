<template>
    <section class="main_content dashboard_part">
        <div class="main_content_iner">
            <div class="container-fluid plr_30 body_white_bg pt_30">
                <div class="row justify-content-center">
                    <div class="col-12">
                        <div class="QA_section">
                            <div class="white_box_tittle list_header">
                                <h4>Data Admin</h4>
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
                                            Tambah Admin
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
                                            <th scope="col" class="text-center td-fit">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-if="!data.users.length">
                                            <td colspan="3" class="text-center">Data Kosong</td>
                                        </tr>
                                        <tr v-for="user in data.users">
                                            <!-- <td class="text-center td-fit">{{ user.no }}</td> -->
                                            <td class="text-center">{{ user.username }}</td>
                                            <td class="td-fit">
                                                <button class="btn mx-1 btn-sm btn-secondary">Ganti Password</button>
                                                <button class="btn mx-1 btn-sm btn-warning" @click="formModal(user.id)">
                                                    Edit
                                                </button>
                                                <button class="btn mx-1 btn-sm btn-danger" @click="deleteUser(user.id)">
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
                users: [],
                modal: null,
                userId: null,
            },
            inputs: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        add(user) {
            this.data.users.push(user)
        },
        addUser() {
            const user = {
                id: 1,
                username: this.inputs.username,
                password: this.inputs.password,
            };

            this.add(user)
            this.data.modal.hide()
            this.inputs.username = '';
            this.inputs.password = '';
        },
        updateUser() {
            const user = {
                id: 1,
                username: this.inputs.username,
                password: this.inputs.password,
            };

            this.data.users[0] = user
            this.data.modal.hide()
            this.inputs.username = ''
            this.inputs.password = ''
        },
        deleteUser(userId) {
            this.data.users = [];
        },
        formModal(userId) {
            this.data.userId = userId
            if (userId) {
                this.inputs.username = this.data.users[0].username;
                this.inputs.password = this.data.users[0].password;
            }
            this.data.modal.show()
        },
        submitForm() {
            this.data.userId ? this.updateUser() : this.addUser()
        }

    },
    mounted() {
        this.data.modal = new Modal(this.$refs.modal.$refs.modal)
    }
}
</script>