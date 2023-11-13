import './adduser.css';
import AdminMenu from '../adminMenu/AdminMenu';
import { useState } from 'react';
import { FaAngleLeft } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineEdit } from "react-icons/md";
import { Link } from 'react-router-dom';

const Admin = () => {
    const [adminImage, setAdminImage] = useState([]);
    const [adminFirstName, setAdminFirstName] = useState('');
    const [adminId, setAdminId] = useState('');
    const [adminLastName, setAdminLastName] = useState('');
    const [adminEmail, setAdminEmail] = useState('');
    const [adminPhone, setAdminPhone] = useState('');
    const [adminPassword, setAdminPassword] = useState('');

    // handle submit
    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('From Data:', {
            'Id:': adminId,
            'First name:': adminFirstName,
            'Last name:': adminLastName,
            'Email:': adminEmail,
            'Phone:': adminPhone,
            'Password:': adminPassword,
            'image:': adminImage
        })
        setAdminImage([]);
        setAdminId('');
        setAdminFirstName('');
        setAdminLastName('');
        setAdminEmail('');
        setAdminPhone('');
        setAdminPassword('');
    }

    // handle add admin
    // handle first name
    const handleId = (e) => {
        const value = e.target.value;
        setAdminId(value); 
    }
    const handleFirstName = (e) => {
        const value = e.target.value;
        setAdminFirstName(value); 
    }
    // handle last name
    const handleLastName = (e) => {
        const value = e.target.value;
        setAdminLastName(value); 
    }
    // handle email address
    const handleEmail = (e) => {
        const value = e.target.value;
        setAdminEmail(value); 
    }
    // handle phone number
    const handlePhone = (e) => {
        const value = e.target.value;
        setAdminPhone(value); 
    }
    // handle Gender
    const handleGender = (e) => {
        const value = e.target.value;
        setAdminGender(value); 
    }
    // handle Department
    const handleDepartment = (e) => {
        const value = e.target.value;
        setAdminDepartment(value); 
    }
    // handle password
    const handlePassowrd = (e) => {
        const value = e.target.value;
        setAdminPassword(value); 
    }


    // handle image
    const handleAdminImage = (e) => {
        const file = e.target.files[0];

        if (file) {
          const reader = new FileReader();

          reader.onloadend = () => {
            setAdminImage([file]);
          };

          reader.readAsDataURL(file);
        }
    };
    return(
        <>
            <AdminMenu/>
            <section id='addAmin'>
                
                <div className='box_addAdmin'>
                    <div className='container_add_admin'> 
                        <Link to="/menageruser/" className='box_guopIconbAck'>
                            <FaAngleLeft id='box_icon_Back' />
                            <p>Back</p>
                        </Link>
                        <h2>Edit User</h2>
                        <div></div>
                    </div>
                    
                    <form onSubmit={handleSubmit}>

                        <div className="imageAdmin">
                            <div className='submit'>
                            </div>
                            <div className="image">
                                <input 
                                    type="file"
                                    id='adminImage'
                                    onChange={handleAdminImage}
                                />
                                <label htmlFor="adminImage">
                                {(adminImage && adminImage.length > 0) ? <img src={URL.createObjectURL(adminImage[0])}/>:<p>Choose image</p>}
                                </label>
                            </div>
                            <div className="box_container_btn">
                                <button className="btn_icon_delete_admin">
                                    <AiOutlineDelete id="btn_icon_admin"/>
                                    <p>Delete</p>
                                </button>
                                <button className="btn_icon_edit_admin">
                                    <p>Update</p>
                                    <MdOutlineEdit id="btn_icon_admin"/>
                                </button>
                            </div>
                        </div>
                        
                        
                        <div className="addAdminForm">
                            <div className="add-box">
                                <label htmlFor="id">ID</label>
                                <input
                                    type="text"
                                    id='id'
                                    placeholder='id'
                                    value={adminId}
                                    onChange={handleId}
                                    required
                                />
                            </div>
                            <div className="add-box">
                                <label htmlFor="fname">First name</label>
                                <input
                                    type="text"
                                    id='fname'
                                    placeholder='Fist name'
                                    value={adminFirstName}
                                    onChange={handleFirstName}
                                    required
                                />
                            </div>
                            <div className="add-box">
                                <label htmlFor="lname">Last name</label>
                                <input
                                    type="text"
                                    id='lname'
                                    placeholder='last name'
                                    value={adminLastName}
                                    onChange={handleLastName}
                                    required
                                />
                            </div>
                            <div className="add-box">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id='email'
                                    placeholder='Email address'
                                    value={adminEmail}
                                    onChange={handleEmail}
                                    required
                                />
                            </div>
                            <div className="add-box">
                                <label htmlFor="phone">Phone</label>
                                <input
                                    type="text"
                                    id='phone'
                                    placeholder='Phone number'
                                    value={adminPhone}
                                    onChange={handlePhone}
                                    required
                                />
                            </div>
                            <div className="add-box">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id='password'
                                    placeholder='Password'
                                    value={adminPassword}
                                    onChange={handlePassowrd}
                                    required
                                />
                            </div>
                        </div>
                        
                    </form>
                    
                    
                </div>
            </section>
        </>
    )
}

export default Admin