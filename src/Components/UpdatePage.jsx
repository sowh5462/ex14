import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { app } from '../firebaseInit'
import { getFirestore, updateDoc, getDoc, doc } from 'firebase/firestore'

const UpdatePage = ({history, match}) => {
    const email = sessionStorage.getItem('email');

    const id = match.params.id;

    const db = getFirestore(app);

    const [form, setForm] = useState({
        title: '',
        body: ''
    });

    const ref_title = useRef(null);

    const ref_body = useRef(null);

    const {title, body} = form;

    const onChange = (e) => {
        setForm({
            ...form,
        [e.target.name] : e.target.value
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if(title === ''){
            alert('제목을 입력하세요');
            ref_title.current.focus();
        }else if(body===''){
            alert('내용을 입력하세요');
            ref_body.current.focus();
        }else{
            if(!window.confirm('수정할까요')) return;
            updateDoc(doc(db, 'posts', id), {
                title:title,
                body:body,
                date:moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                email:email
            });
            history.push('/posts')
        };
    };

    const getPost = async() => {
        const result = await getDoc(doc(db, 'posts', id));
        setForm(result.data());
    };

    useEffect(()=>{
        getPost();
    },[]);

    return (
        <div>
            <h1>글수정</h1>
            <Row className='justify-content-center'>
                <Col xl={8}>
                    <Form onSubmit={onSubmit}>
                        <Form.Control placeholder='제목을 입력하세요' name='title' value={title} onChange={onChange} ref={ref_title} />
                        <Form.Control placeholder='내용을 입력하세요' as='textarea' rows={10} 
                        className='my-3' name='body' value={body} onChange={onChange} ref={ref_body} />
                        <Button type='submit' className='px-5'>글저장</Button>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}

export default UpdatePage