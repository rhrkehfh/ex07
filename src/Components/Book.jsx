import React, { useState } from 'react'
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Book = ({ book }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                보기
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>{book.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card>
                        <img src={book.thumbnail} />
                        <div>가격:{book.price}</div>
                        <div>저자:{book.authors}</div>
                        <hr />
                        <div>{book.contents}</div>
                    </Card>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}



export default Book