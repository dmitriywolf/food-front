import { Outlet } from 'react-router-dom';
import { Header, Footer } from 'components';
import classes from './styles.module.scss';

export default function RootLayout() {
  return (
    <section className={classes.layout}>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </section>
  );
}
