import Header from './header/Header';
import '../../public/styles/bootstrap.min.css';
import '../../public/styles/app.css';
const Layout = props => (
  <div>
    <Header />
    {props.children}
  </div>
);

export default Layout;
