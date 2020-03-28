import React from 'react'

export default function Header(props) {
    return (
        <div>
            <nav>
                <ul className="nav nav-tabs bg-primary">
                    <li className="active" onClick={props.handleSelect.bind(this,0)}><a href="#profile" data-toggle="tab" aria-expanded="true"><i className="fas fa-id-badge"></i> Profile</a></li>
                    <li onClick={props.handleSelect.bind(this,1)}><a href="#bugs" data-toggle="tab" aria-expanded="true"><i className="fas fa-bug"></i> Bugs</a></li>
                    <li ><a id="log_out" href="/login" aria-expanded="true" className="navbar-right"><i className="fas fa-sign-out-alt"></i> Logout</a></li>
                </ul>
            </nav>

            
        </div>
    )
}
