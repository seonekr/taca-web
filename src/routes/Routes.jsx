import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../user/components/homepage/Home";
import Account from "../user/components/account/Account";
import General from "../user/components/account/General";
import Contact from "../user/components/account/Contact";
import Password from "../user/components/account/Password";
import Payment from "../user/components/cart/Payment";
import SuccessfulBuy from "../user/components/cart/SuccessfulBuy";
import Cart from "../user/components/cart/Cart";
import Address from "../user/components/cart/Address";
import Contacts from "../user/components/contact/Contact";
import Bill from "../user/components/order/Bill";
import Dashboard from "../admin/Dashboard";
import AddProduct from "../admin/components/products/AddProduct";
import Categories from "../user/components/categories/Categories";

/* ========= Phukeo ========= */
import Login from "../user/components/login_register/Login";
import AlertLogin from "../user/components/login_register/AlertLogin";
import AlertSignup from "../user/components/login_register/AlertSignup";
import Register from "../user/components/login_register/Register";
import Order from "../user/components/order/Order";
import Product_search from "../user/components/products/Product_search";
import ProductDetails from "../user/components/products/ProductDetails";
import OrderPage from "../admin/components/orderPage/OrderPage";
import OrderBill from "../admin/components/orderPage/OrderBill";
import Admins from "../admin/components/menagerAdmin/Admins";
import Product from "../admin/components/products/Product";
import EditProduct from "../admin/components/products/Product";

// ===============================
import Users from "../admin/components/menagerUser/Users";
import User from "../admin/components/menagerUser/User";
import AdminDetail from "../admin/components/menagerAdmin/AdminDetail";
import AddAdmin from "../admin/components/menagerAdmin/AddAdmin";
import EditAdmin from "../admin/components/menagerAdmin/EditAdmin";

import Admin_acount from "../admin/components/menagerAdmin/Admin_acount";
import UpdateAdmin_Account from "../admin/components/menagerAdmin/UpdateAdmin_Account";

const Links = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route exact path="/account" Component={Account} />
        <Route exact path="/account/general" Component={General} />
        <Route exact path="/account/contact" Component={Contact} />
        <Route exact path="/account/password" Component={Password} />
        <Route exact path="/cart/payment" Component={Payment} />
        <Route exact path="/cart/address" Component={Address} />
        <Route exact path="/contacts" Component={Contacts} />
        <Route exact path="/order" Component={Order} />
        <Route exact path="/order/bill" Component={Bill} />
        <Route exact path="/categories" Component={Categories} />
        <Route exact path="/cart/successfulBuy" Component={SuccessfulBuy} />

        {/*==== phukeo ==== */}
        <Route exact path="/product_search" Component={Product_search} />
        <Route exact path="/productdetails/:id" Component={ProductDetails} />
        <Route exact path="/login" Component={Login} />
        <Route exact path="/register" Component={Register} />
        <Route exact path="/cart" Component={Cart} />
        <Route exact path="/alertLogin" Component={AlertLogin} />
        <Route exact path="/alertSignup" Component={AlertSignup} />

        {/* Admin routes */}
        <Route exact path="/dashboard" Component={Dashboard} />
        <Route exact path="/product/add" Component={AddProduct} />
        <Route exact path="/products" Component={Product} />
        <Route exact path="/product/edit/:id" Component={EditProduct} />
        <Route exact path="/users" Component={Users} />
        <Route exact path="/orderpage" Component={OrderPage} />
        <Route exact path="/orderbill" Component={OrderBill} />
        <Route exact path="/user/detail/:id" Component={User} />
        <Route exact path="/admins" Component={Admins} />
        <Route exact path="/admin/detail/:id" Component={AdminDetail} />
        <Route exact path="/admin/edit/:id" Component={EditAdmin} />
        <Route exact path="/admin/register" Component={AddAdmin} />
        <Route exact path="/admin/acount" Component={Admin_acount} />
        <Route
          exact
          path="/updateAdminAccount"
          Component={UpdateAdmin_Account}
        />
      </Routes>
    </Router>
  );
};

export default Links;
