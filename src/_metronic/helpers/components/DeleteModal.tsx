import React, {useState} from 'react'
import {Modal} from 'react-bootstrap'
import {KTSVG} from './KTSVG'
import Button from 'react-bootstrap/Button'

type Props = {
  handleDelete: any
  id: any
  title: string
  show: boolean
  setShow: any
  setId: any
}

const DeleteModal = ({handleDelete, id, title, show, setShow}: Props) => {
  const handleClose = () => {
    setShow(false)
  }
  const handleDeleteClose = () => {
    handleDelete(id)
    setShow(false)
  }
  console.log('from modalllll', title)
  // const handleShow = () => setShow(true)
  return (
    <>
      {/* <span onClick={handleShow} className='text-dark fw-bold text-hover-primary mb-1 fs-6'>
        <i className='fa-solid fa-trash-can text-danger cursor-pointer'></i>
      </span> */}
      <Modal
        aria-labelledby='contained-modal-title-vcenter'
        centered
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body>{`Are you sure you want to delete this ${title} !`}</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='danger' onClick={handleDeleteClose}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default DeleteModal
