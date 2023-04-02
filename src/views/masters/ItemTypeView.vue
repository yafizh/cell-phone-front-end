<template>
    <section class="main_content dashboard_part">
        <div class="main_content_iner">
            <div class="container-fluid plr_30 body_white_bg pt_30">
                <div class="row justify-content-center">
                    <div class="col-12">
                        <div class="QA_section">
                            <div class="white_box_tittle list_header">
                                <h4>Data Jenis Barang</h4>
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
                                            Tambah Jenis Barang
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="QA_table mb-5">
                                <table class="table lms_table_active">
                                    <thead>
                                        <tr>
                                            <!-- <th scope="col" class="text-center td-fit">No</th> -->
                                            <th scope="col" class="text-center">Jenis Barang</th>
                                            <th scope="col" class="text-center">Posisi</th>
                                            <th scope="col" class="text-center td-fit">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-if="!data.itemTypes.length">
                                            <td colspan="3" class="text-center">Data Kosong</td>
                                        </tr>
                                        <tr v-for="itemType in data.itemTypes">
                                            <!-- <td class="text-center td-fit">{{ itemType.no }}</td> -->
                                            <td class="text-center">{{ itemType.name }}</td>
                                            <td class="text-center">{{ itemType.username }}</td>
                                            <td class="td-fit">
                                                <button class="btn mx-1 btn-sm btn-warning" @click="formModal(itemType.id)">
                                                    Edit
                                                </button>
                                                <button class="btn mx-1 btn-sm btn-danger"
                                                    @click="deleteEmployee(itemType.id)">
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
                <label class="form-label">Jenis Barang</label>
                <input type="text" v-model="inputs.name" class="form-control" required autocomplete="username">
            </div>
            <div class="mb-3">
                <label class="form-label">Posisi</label>
                <input type="text" v-model="inputs.position" class="form-control" required autocomplete="username">
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
                itemTypes: [],
                modal: null,
                itemTypeId: null,
            },
            inputs: {
                name: '',
                username: '',
                password: ''
            }
        }
    },
    methods: {
        add(itemType) {
            this.data.itemTypes.push(itemType)
        },
        addEmployee() {
            const itemType = {
                id: 1,
                name: this.inputs.name,
                position: this.inputs.position,
            };

            this.add(itemType)
            this.data.modal.hide()
            this.inputs.name = '';
            this.inputs.position = '';
        },
        updateItemType() {
            const itemType = {
                id: 1,
                name: this.inputs.name,
                position: this.inputs.position,
            };

            this.data.itemTypes[0] = itemType
            this.data.modal.hide()
            this.inputs.name = ''
            this.inputs.position = ''
        },
        deleteItemType(itemTypeId) {
            this.data.itemTypes = [];
        },
        formModal(itemTypeId) {
            this.data.itemTypeId = itemTypeId
            if (itemTypeId) {
                this.inputs.name = this.data.itemTypes[0].name;
                this.inputs.position = this.data.itemTypes[0].position;
            }
            this.data.modal.show()
        },
        submitForm() {
            this.data.itemTypeId ? this.updateItemType() : this.addItemType()
        }

    },
    mounted() {
        this.data.modal = new Modal(this.$refs.modal.$refs.modal)
    }
}
</script>