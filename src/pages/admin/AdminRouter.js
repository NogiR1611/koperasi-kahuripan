import React from 'react';
import {Route,Switch,Redirect} from 'react-router-dom';
import PrivateRoute from '../../privateRoute.js';

//views
import Simpanan from './views/Simpanan';
import DashboardAdmin from './views/dashboardAdmin.js';
import Profil from './views/Profil.js';
import Pemasukan from './views/Pemasukan.js';
import Pengeluaran from './views/Pengeluaran.js';
import TotalSimpanan from './views/TotalSimpanan.js';
import PinjamanAnggota from './views/PinjamanAnggota';
import Setoran from './views/Setoran.js';
import TotalPinjaman from './views/TotalPinjaman.js';
import Anggota from './views/Anggota.js';
import Kolektor from './views/Kolektor.js';
import DataAdmin from './views/Admin.js';
import TotalAnggota from './views/TotalAnggota.js';
import BagiSHU from './views/BagiSHU.js';
import Rekap from './views/Rekap.js';
import Inventaris from './views/Inventaris.js';
import LoginAdmin from './LoginAdmin.js';


//components
import AdminNavbar from "./components/AdminNavbar.js";
import Sidebar from "./components/Sidebar.js";
import FooterAdmin from "./components/FooterAdmin.js";

import '../../assets/style/tailwind.css';


function Admin(){
    React.useEffect(() => window.scrollTo({ top: 0 }))
    return (
        <>
            <Sidebar />
            <div className="relative md:ml-64 bg-blueGray-100">
                <AdminNavbar />
                <div className="min-h-screen"> 
                <Switch>
                    <Route exact path='/login' restricted={true} component={LoginAdmin} />
                    <PrivateRoute path='/admin/dashboard' restricted={true} component={DashboardAdmin} />
                    <PrivateRoute path='/admin/profile' restricted={true} component={Profil} />
                    <PrivateRoute path='/admin/pemasukan' restricted={true} component={Pemasukan} />
                    <PrivateRoute path='/admin/pengeluaran' restricted={true} component={Pengeluaran} />
                    <PrivateRoute path='/admin/simpanan/:type' restricted={true} component={Simpanan} />
                    <PrivateRoute path='/admin/total-simpanan' restricted={true} component={TotalSimpanan} />
                    <PrivateRoute path='/admin/pinjaman-anggota' restricted={true} component={PinjamanAnggota} />
                    <PrivateRoute path='/admin/setoran' restricted={true} component={Setoran} />
                    <PrivateRoute path='/admin/total-pinjaman' restricted={true} component={TotalPinjaman} />
                    <PrivateRoute path='/admin/anggota' restricted={true} component={Anggota} />
                    <PrivateRoute path='/admin/kolektor' restricted={true} component={Kolektor} />
                    <PrivateRoute path='/admin/data-admin' restricted={true} component={DataAdmin} />
                    <PrivateRoute path='/admin/total-anggota' restricted={true} component={TotalAnggota} />
                    <PrivateRoute path='/admin/shu' restricted={true} component={BagiSHU} />
                    <PrivateRoute path='/admin/inventaris' restricted={true} component={Inventaris} />
                    <PrivateRoute path='/admin/rekapitulasi' restricted={true} component={Rekap} />
                    <Redirect from='/' to='/admin/dashboard' />
                    <Redirect from='/admin' to='/admin/dashboard' />
                </Switch>
                </div>
                <FooterAdmin />
            </div>
        </>
    );
}

export default Admin;