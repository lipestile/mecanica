import Link from "next/link";
import { useRouter } from "next/router";
import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import { Fragment } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { RiLogoutBoxLine } from 'react-icons/ri';


function Navigation(props) {
    const router = useRouter();
    const [user, loading] = useAuthState(auth);

    const LoginBtnHandler = () => {
        if (user) {
            toast.warn("You are loggedin!", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
                hideProgressBar: true,
            });
        } else {
            router.push("/Login");
        }
    };

    const ProfileClickHandler = () => {
        auth.signOut();
        toast.success("You are logged out!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1500,
            hideProgressBar: true,
        });
    };
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/">Garage<strong>Pro</strong></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav ">
                        <Nav className="justify-content-end flex-grow-1 ">
                                {user && (
                                    <img width={40}
                                        className="cursor-pointer rounded-full"
                                        src={user?.photoURL}
                                        alt={user?.displayName}
                                        title="Sair"
                                    />
                                )}
                        </Nav>
                        <Nav className="p-3">
                            <RiLogoutBoxLine
                            width={40}
                            onClick={ProfileClickHandler}
                            />
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </>
    );
}
export default Navigation;