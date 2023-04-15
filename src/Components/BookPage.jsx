import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Row, Col, Button, Form, Card } from 'react-bootstrap'
import Book from './Book';

const BookPage = () => {
    const [loading, setLoading] = useState(false);
    const [lists, setLists] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [is_end, setIs_end] = useState(false);
    const [query, setQuery] = useState('리액트');
    const getBooks = async () => {
        const url = "https://dapi.kakao.com/v3/search/book?target=title";
        const config = {
            headers: { "Authorization": "KakaoAK 8e433a09ccc2d1afeed7a8739e13df99" },
            params: { "query": query, "size": 8, "page": page }
        }
        setLoading(true);

        const result = await axios.get(url, config);
        setLists(result.data.documents);
        setTotal(result.data.meta.pageable_count);
        setIs_end(result.data.meta.is_end);
        console.log(result);
        setLoading(false);
    }

    useEffect(() => {
        getBooks();
    }, [page])

    const onSubmit = (e) => {
        e.preventDefault();
        setPage(1);
        getBooks();
    }

    if (loading) return <h1 className='text-center my-5'>로딩중</h1>

    return (
        <Row>
            <h1 className='text-center my-3'>Search</h1>
            <Row>
                <Col md={4}>
                    <Form onSubmit={onSubmit}>
                        <Form.Control value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder='검색어' />
                    </Form>
                </Col>
                <Col> 검색수:{total}건 </Col>
            </Row>
            <hr />
            <Row>
                {lists.map(book =>
                    <Col key={book.isbn} md={3} xs={6} className="my-2">
                        <Card>
                            <Card.Body>
                                <img src={book.thumbnail} />
                                <div className='ellipsis'>{book.title}</div>
                                <Book book={book} />
                            </Card.Body>
                        </Card>
                    </Col>)}
                <div className='text-center my-3'>
                    <Button onClick={() => setPage(page - 1)}
                        disabled={page == 1 && true}
                        className="btn-sm">이전</Button>
                    <spna className="px-3">{page}</spna>
                    <Button onClick={() => setPage(page + 1)}
                        disabled={is_end && true}
                        className="btn-sm">다음</Button>
                </div>
            </Row >
        </Row>
    )
}

export default BookPage