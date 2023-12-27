import React from 'react'
import { NavLink } from 'react-router-dom'

export default function UserMenu() {
    return (
        <>
            <div className='text-centre'>

                <h3>DashBoard</h3>

                <div class="list-group">
                    <NavLink to="/dashboard/user/profile"
                        className="list-group-item list-group-item-action">
                        Profile
                    </NavLink>

                    <NavLink to="/dashboard/user/order"
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
