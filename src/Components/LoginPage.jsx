import React, { useState } from 'react'
import { Row, Col, Card, Form, Button } from 'react-bootstrap'
import { app } from '../firebaseInit'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import LoadingPage from './LoadingPage'

const LoginPage = ({ history }) => {
    const auth = getAuth(app);

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        email: 'user01@email.com',
        password: '12341234'
    });

    const { email, password } = form;

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const onSubmit = (e) => {
        setLoading(true);
        e.preventDefault();
        //로그인처리
        signInWithEmailAndPassword(auth, email, password)
            .then((success) => {
                alert('Welcome');
                setLoading(false);
                sessionStorage.setItem('email', email);
                history.push('/');
            })
            .catch((error) => {
                alert(error.message);
                setLoading(false);
            });
    };

    if (loading) return <LoadingPage />
    return (
        <div>
            <Row className='justify-content-center'>
                <Col xl={6} md={6} className='m-3'>
                    <Card className='text-center'>
                        <Card.Title className='mt-2'>
                            <h3>Login</h3>
                        </Card.Title>
                        <Card.Body>
                            <Form onSubmit={onSubmit}>
                                <Form.Control placeholder='Email' name='email' value={email} onChange={onChange} />
                                <Form.Control placeholder='PassWord' type='password' className='mt-2' name='password' value={password} onChange={onChange} />
                                <Button type='submit' variant='light' className='mt-2'>Login</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default LoginPage