import { NavLink } from "react-router-dom"


function PageNav() {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink to="/">Worldwise</NavLink>
                </li>
                <li>
                    <NavLink to="/pricing">Pricing</NavLink>
                </li>
                <li>
                    <NavLink to="/product">Product</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default PageNav
