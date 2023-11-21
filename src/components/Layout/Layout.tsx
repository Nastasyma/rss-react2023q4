import ErrorButton from "../Error/ErrorButton/ErrorButton";
import Search from "../Search/Search";
import styles from "./Layout.module.scss";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps): JSX.Element => (
  <main className={styles.main} data-testid="home-page">
    <Search />
    <ErrorButton title="Click me!" />
    {children}
  </main>
);
export default Layout;