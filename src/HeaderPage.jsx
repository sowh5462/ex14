import React, { useContext, useEffect, useState } from 'react'
import { Nav } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link, withRouter } from 'react-router-dom';
import { UserContext } from './Components/UserContext';
import { app } from './firebaseInit'
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import LoadingPage from './Components/LoadingPage';

const HeaderPage = ({ history }) => {
    const { user, setUser } = useContext(UserContext);
    const email = sessionStorage.getItem('email');
    const db = getFirestore(app);

    const [loading, setLoading] = useState(false);

    const getUser = async () => {
        setLoading(true);
        const result = await getDoc(doc(db, 'users', email));
        // console.log(result.data());
        setUser(result.data())
        setLoading(false);
    };

    useEffect(() => {
        if (email) getUser();
    }, [email]);

    const onLogout = () => {
        sessionStorage.removeItem('email');
        setUser(null);
        history.push('/');
    };

    if (loading) return <LoadingPage />
    return (
        <div className='header'>
            <img src="data:image/jpeg;base64,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"
                alt="" className='banner' />

            <Navbar bg="light" variant="light">
                <Container>
                    <Navbar.Brand href='/'><i class="bi bi-house-fill"></i></Navbar.Brand>
                    <Nav className="me-auto">
                        <Link to='/'>Home</Link>
                        <Link to='/posts'>Posts</Link>
                        {email ? <Link to='#' onClick={onLogout}>Logout</Link>
                            :
                            <Link to='/login'>Login</Link>
                        }
                    </Nav>
                    {(user && user.name) && <Link to='/mypage'>{user.name}</Link>}
                    {(user && user.photo) && <img src={user.photo} alt="" className='profile_image' />}
                </Container>
            </Navbar>
        </div>
    )
}

export default withRouter(HeaderPage)