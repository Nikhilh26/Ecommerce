import React from 'react'
import { NavLink } from 'react-router-dom'

export default function AdminMenu() {
    return (
        <>
            <div className='text-centre'>

                <h3>Admin Panel</h3>

                <div class="list-group">
                    <NavLink to="/dashboard/admin/create-category"
                        className="list-group-item list-group-item-action">
                        Create Category
                    </NavLink>

                    <NavLink to="/dashboard/admin/create-product"
                        className="list-group-item list-group-item-action">
                        Create Product
                    </NavLink>

                    <NavLink to="/dashboard/admin/users"
                        className="list-group-item list-group-item-action">
                        Users
                    </NavLink>
                </div>

            </div>
        </>
    )
}
