import { Link, NavLink} from "react-router-dom";
import styles from "./MainNavigation.module.css";

const MainNavigation = () =>
{
    //  This file is to style the quotes pages which includes a header and nav
    return (
        <header className={styles.header}>
            <div className={styles.logo}>Xander's Quotes</div>
            <nav className={styles.nav}>
                <ul>
                    {/* Use NavLink to add styles to the active link to show which is the active Link*/}
                    <li><NavLink activeClassName={styles.active} to="/quotes">All Quotes</NavLink></li>
                    <li><NavLink activeClassName={styles.active} to="/addQuote">Add a Quote</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

export default MainNavigation;