import { Outlet } from 'react-router-dom';
import classes from './styles.module.scss';

export default function AuthLayout() {
  return (
    <div>
      {/* <Header /> */}
      <main>
        <Outlet />
      </main>

      {/* <Footer /> */}
    </div>
  );
}
