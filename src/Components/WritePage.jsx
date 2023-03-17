import moment from 'moment';
import React, { useRef, useState } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { app } from '../firebaseInit'
import { getFirestore, collection, addDoc } from 'firebase/firestore'


const WritePage = ({history}) => {
    const email = sessionStorage.getItem('email');

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
            if(!window.confirm('저장할까요')) return;
            const data = {
                title: title,
                body: body,
                email: email,
                date: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
            };
            // console.log(data);
            addDoc(collection(db, 'posts'), data);
            setForm({
                title: '',
                body: ''
            });
            alert('success');
            history.go(-1);
        };
    };

    return (
        <div>
            <h1>글쓰기</h1>
            <Row>
                <Col>
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

export default WritePage