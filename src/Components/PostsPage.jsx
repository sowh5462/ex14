import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { Link, Route } from 'react-router-dom';
// import WritePage from './WritePage'
import { Row, Col, Card } from 'react-bootstrap'
import { app } from '../firebaseInit'
import { query, getFirestore, onSnapshot, collection, orderBy } from 'firebase/firestore';
import LoadingPage from './LoadingPage';

const PostsPage = ({history}) => {
    const email = sessionStorage.getItem('email');
    const db = getFirestore(app);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [posts, setPosts] = useState([]);

    const getPosts = () => {
        setLoading(true);
        const q = query(collection(db, 'posts'), orderBy("date", "desc"))
        onSnapshot(q, (result) => {
            let rows = [];
            result.forEach(row => {
                rows.push({id:row.id, ...row.data()});
            });
            // console.log(rows);
            setTotal(rows.length);
            setPosts(rows);
        });
        setLoading(false);
    };

    useEffect(() => {
        getPosts();
    }, []);



    if (loading) return <LoadingPage />
    return (
        <div className='post'>
            <Row className='justify-content-center'>
                <Col xl={8}>
                    <>
                    <h1 className='d-inline'>Posts</h1>
                    {email && 
                    <>
                        <Link to='/posts/write' className='float-end'>
                            <Button variant='outline-secondary' className='mt-3'>write</Button>
                        </Link><hr />
                    </>    
                    }
                    </>
                    
                    {posts.map(post =>
                        <Card className='my-3 postsCard' key={post.id} onClick={()=>history.push(`/posts/${post.id}`)}>
                            <Card.Body>
                                <h5>{post.title}</h5>
                                <p className='ellipsis'>{post.body}</p>
                            </Card.Body>
                            <Card.Footer>
                                {post.email} {post.date}
                            </Card.Footer>
                        </Card>
                    )}
                </Col>
            </Row>





        </div>
    )
}

export default PostsPage