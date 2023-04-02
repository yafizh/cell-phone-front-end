<template>
    <nav class="sidebar">
        <div class="logo d-flex justify-content-between">
            <a href="index.html"><img src="../assets/img/logo.png" alt=""></a>
            <div class="sidebar_close_icon d-lg-none">
                <i class="ti-close"></i>
            </div>
        </div>
        <ul id="sidebar_menu">
            <li>
                <a class="has-arrow" href="#" aria-expanded="false">

                    <img src="../assets/img/menu-icon/1.svg" alt="">
                    <span>Data Utama</span>
                </a>
                <ul>
                    <li><router-link to="/admin">Admin</router-link></li>
                    <li><router-link to="/employees">Pegawai</router-link></li>
                    <li><router-link to="/item-types">Jenis Barang</router-link></li>
                </ul>
            </li>
            <li>
                <a class="has-arrow" href="#" aria-expanded="false">

                    <img src="../assets/img/menu-icon/1.svg" alt="">
                    <span>Data Item</span>
                </a>
                <ul>
                    <li><a href="#">Barang</a></li>
                    <li><a href="#">Pulsa</a></li>
                    <li><a href="#">Top Up</a></li>
                </ul>
            </li>
            <li>
                <a class="has-arrow" href="#" aria-expanded="false">

                    <img src="../assets/img/menu-icon/1.svg" alt="">
                    <span>Data Penjualan</span>
                </a>
                <ul>
                    <li><a href="#">Semua</a></li>
                    <li><a href="#">Barang</a></li>
                    <li><a href="#">Pulsa</a></li>
                    <li><a href="#">Top Up</a></li>
                </ul>
            </li>
            <li>
                <a class="has-arrow" href="#" aria-expanded="false">

                    <img src="../assets/img/menu-icon/1.svg" alt="">
                    <span>Data Penyupalain</span>
                </a>
                <ul>
                    <li><a href="#">Semua</a></li>
                    <li><a href="#">Barang</a></li>
                    <li><a href="#">Pulsa</a></li>
                    <li><a href="#">Top Up</a></li>
                </ul>
            </li>
            <li>
                <a class="has-arrow" href="#" aria-expanded="false">

                    <img src="../assets/img/menu-icon/1.svg" alt="">
                    <span>Laporan</span>
                </a>
                <ul>
                    <li><a href="#">1</a></li>
                    <li><a href="#">2</a></li>
                    <li><a href="#">3</a></li>
                </ul>
            </li>
        </ul>
    </nav>
</template>
<script>
import metisMenus from 'metismenujs'

export default {
    mounted() {
        metisMenus.attach('#sidebar_menu')
    }
}
</script>