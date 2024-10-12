import { Routes, Route } from "react-router-dom";
import AdminApp from "../pages/AdminApp";
import AddItem from './../pages/Admin/AddItem';
import ListItems from './../pages/Admin/ListItems';
import Orders from './../pages/Admin/Orders';



const AdminRoutes = () => {
    return (
        <Routes>
        <Route path="/" element={<AdminApp />}>
            <Route path="add" element={<AddItem />} />
            <Route path="list" element={<ListItems />} />
            <Route path="orders" element={<Orders />} />
        </Route>
        </Routes>
    );
};

export default AdminRoutes;
