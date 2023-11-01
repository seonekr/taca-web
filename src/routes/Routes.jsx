import { BrowserRouter as Router, Routes , Route } from "react-router-dom";
import Home from "../user/components/homepage/Home";
import Account from "../user/components/account/Account";
import General from "../user/components/account/General";
import Contact from "../user/components/account/Contact";
import Password from "../user/components/account/Password";
import Payment from "../user/components/cart/Payment";
import Cart from "../user/components/cart/Cart";
import Address from "../user/components/cart/Address";
import Chatuser from "../user/components/chat/Chatuser";
import Chatroom from "../user/components/chat/Chatroom";
import Bill from "../user/components/order/Bill";
import Dashboard from "../admin/Dashboard";
import Post from "../admin/components/post/Post";
import AddAdmin from "../admin/components/addAdmin/AddAdmin";
import Message from "../admin/components/messages/Message";
import Categories from "../user/components/categories/Categories";

/* ========= Phukeo ========= */
import Login from '../user/components/login_register/Login';
import Register from "../user/components/login_register/Register";
import Order from "../user/components/order/Order";
import Product_search from "../user/components/products/Product_search";
import ProductDetails from "../user/components/products/ProductDetails";
import MenagerUser from "../admin/components/menagerUser/MenagerUser";
import OrderPage from "../admin/components/orderPage/OrderPage";
import OrderBill from "../admin/components/orderPage/OrderBill"
import LoginAdmin from "../admin/components/registeradmin/LoginAdmin"
import MenagerAdmin from "../admin/components/menagerAdmin/MenagerAdmin";


const Links = () => {
    return(
        <Router>
            <Routes>

                <Route exact path="" Component={Home}/>
                <Route exact path="/account" Component={Account}/>
                <Route exact path="/account/general" Component={General}/>
                <Route exact path="/account/contact" Component={Contact}/>
                <Route exact path="/account/password" Component={Password}/>
                <Route exact path="/cart/payment" Component={Payment}/>
                <Route exact path="/cart/address" Component={Address}/>
                <Route exact path="/chatuser" Component={Chatuser}/>
                <Route exact path="/chatuser/chatroom" Component={Chatroom}/>
                <Route exact path="/order" Component={Order}/>
                <Route exact path="/order/bill" Component={Bill}/>
                <Route exact path="/categories" Component={Categories}/>


                {/* Admin routes */}
                <Route exact path="/admin/dashboard" Component={Dashboard}/>
                <Route exact path="/admin/post" Component={Post}/>
                <Route exact path="/admin/addadmin" Component={AddAdmin}/>
                <Route exact path="/admin/message" Component={Message}/>

                {/*==== phukeo ==== */}

                <Route exact path="/product_search" Component={Product_search}/>
                <Route exact path="/product_search/productdetails" Component={ProductDetails}/>
                <Route exact path="/login" Component={Login}/>
                <Route exact path="/register" Component={Register}/>
                <Route exact path="/cart" Component={Cart}/>

                 {/* Admin routes */}
                 <Route exact path="/admin/menageruser" Component={MenagerUser}/>
                 <Route exact path="/admin/orderpage" Component={OrderPage}/>
                 <Route exact path="/admin/orderbill" Component={OrderBill}/>
                 <Route exact path="/admin/menageradmin" Component={MenagerAdmin}/>
                 <Route exact path="/admin" Component={LoginAdmin}/>


            </Routes>
        </Router>
    );
};

export default Links;