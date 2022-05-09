import { Navbar, Container, Nav } from 'react-bootstrap';
import { useRouter } from 'next/router';
import styles from './Header.module.scss';

const Header = () => {
  const router = useRouter();

  const handleRoute = (route) => {
    router.push(`${route}`);
  };

  return (
    <Navbar className={styles.navbar} expand="lg">
      <Container>
        <Navbar.Brand
          className="text-light m-0"
          onClick={() => handleRoute('/')}
        >
          Minting Dapp
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link
              className={
                router.asPath === '/' || router.asPath === '/#mint'
                  ? styles.active
                  : null
              }
              onClick={() => handleRoute('/#mint')}
              id={styles.linkText}
            >
              MINT
            </Nav.Link>
            <Nav.Link
              className={router.asPath === '/#gallery' ? styles.active : null}
              onClick={() => handleRoute('/#gallery')}
              id={styles.linkText}
            >
              GALLERY
            </Nav.Link>
            <Nav.Link
              className={router.asPath === '/#roadmap' ? styles.active : null}
              onClick={() => handleRoute('/#roadmap')}
              id={styles.linkText}
            >
              ROADMAP
            </Nav.Link>
            <Nav.Link
              className={router.asPath === '/#faq' ? styles.active : null}
              onClick={() => handleRoute('/#faq')}
              id={styles.linkText}
            >
              FAQ
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
