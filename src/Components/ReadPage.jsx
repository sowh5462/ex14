import React, { useEffect, useState } from 'react'
import { app } from '../firebaseInit'
import { getFirestore, doc, getDoc, deleteDoc } from 'firebase/firestore';
import LoadingPage from './LoadingPage';
import { Button, Card, Col, Row } from 'react-bootstrap';

const ReadPage = ({match, history}) => {
    const id = match.params.id;
    const db = getFirestore(app);
    const [post, setPost] = useState('');
    const [loading, setLoading] = useState(false);
    const email = sessionStorage.getItem('email');

    const getPost = async() => {
        setLoading(true);
        const result = await getDoc(doc(db, 'posts', id));
        // console.log(result.data())
        setPost(result.data());
        setLoading(false);
    };

    useEffect(()=>{
        getPost();
    },[]);

    const onDelete = async(id) => {
        if(!window.confirm(`${id} 게시글을 삭제할까요`)) return;
        await deleteDoc(doc(db, 'posts', id));
        history.push('/posts')
    };

    if(loading) return <LoadingPage/>
    return (
        <div>
            <Row className='justify-content-center mt-4'>
                <Col xl={8}>
                    <Card>
                        <Card.Title className='mx-3 py-2 text-center border-bottom border-2'>
                            <span>{post.title}</span>
                            {email === post.email && 
                                <span className='float-end'>
                                    <Button className='me-2' variant='secondary' size='sm' 
                                    onClick={()=>history.push(`/posts/update/${id}`)}>수정</Button>
                                    <Button variant='secondary' size='sm' onClick={()=>onDelete(id)}>삭제</Button>
                                </span>
                            }
                        </Card.Title>
                        <Card.Body>
                            <p className='lh-lg'>{post.body}</p>
                            <hr />
                            <span>{post.email}</span>
                            <span className='float-end'>{post.date}</span>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default ReadPage