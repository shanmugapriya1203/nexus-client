import React from "react";
import { Modal, ModalHeader, ModalFooter, Button } from "flowbite-react";

const DeleteModal = ({
  showDeleteModal,
  setShowDeleteModal,
  confirmDelete,
}) => {
  return (
    <Modal
      show={showDeleteModal}
      onClose={() => setShowDeleteModal(false)}
      size="md"
      popup
      className="my-custom-modal"
    >
      <ModalHeader closebutton>
        <h3>Are you sure you want to delete this incident?</h3>
      </ModalHeader>
      <ModalFooter>
        <Button color="failure" onClick={confirmDelete}>
          Yes
        </Button>
        <Button color="gray" onClick={() => setShowDeleteModal(false)}>
          No
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default DeleteModal;
