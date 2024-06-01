import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  TextInput,
  Select,
  Button,
} from "flowbite-react";
import { Link } from "react-router-dom";

const EmergencyModal = ({
  showModal,
  setShowModal,
  modalType,
  selectedIncident,
  newIncident,
  handleChange,
  handleSubmit,
  handleUpdate,
  currentUser,
}) => {
  return (
    <Modal
      show={showModal}
      onClose={() => setShowModal(false)}
      size="md"
      popup
      className="my-custom-modal"
    >
      {modalType === "readMore" && selectedIncident && (
        <>
          <ModalHeader closebutton>
            <h3>{selectedIncident.type}</h3>
          </ModalHeader>
          <ModalBody>
            <div className="space-y-6">
              <p>
                <strong>Location:</strong> {selectedIncident.location}
              </p>
              <p>
                <strong>Description:</strong> {selectedIncident.description}
              </p>
              <p>
                <strong>Severity:</strong> {selectedIncident.severity}
              </p>
              <p>
                <strong>Status:</strong> {selectedIncident.status}
              </p>
              <p>
                <strong>Required Responder Types:</strong>{" "}
                {selectedIncident.requiredResponderTypes.join(", ")}
              </p>
              <p>
                <strong>Required Responder Quantity:</strong>{" "}
                {selectedIncident.requiredResponderQuantity}
              </p>
            </div>
          </ModalBody>
          <ModalFooter>
            {(currentUser.user.role === "admin" ||
              currentUser.user.role === "volunteer") && (
              <Link to={`/allocate/${selectedIncident._id}`}>
                <Button className="w-auto mx-auto" link>
                  Allocate
                </Button>
              </Link>
            )}
          </ModalFooter>
        </>
      )}
      {(modalType === "addIncident" || modalType === "editIncident") && (
        <>
          <ModalHeader closebutton>
            <h3>
              {modalType === "addIncident"
                ? "Add New Incident"
                : "Edit Incident"}
            </h3>
          </ModalHeader>
          <ModalBody>
            <div className="space-y-6">
              <div>
                <Label htmlFor="type">Type</Label>
                <TextInput
                  id="type"
                  name="type"
                  type="text"
                  value={newIncident.type}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <TextInput
                  id="location"
                  name="location"
                  type="text"
                  value={newIncident.location}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <TextInput
                  id="description"
                  name="description"
                  type="text"
                  value={newIncident.description}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="severity">Severity</Label>
                <Select
                  id="severity"
                  name="severity"
                  value={newIncident.severity}
                  onChange={handleChange}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </Select>
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <TextInput
                  id="status"
                  name="status"
                  type="text"
                  value={newIncident.status}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="requiredResponderTypes">
                  Required Responder Types
                </Label>
                <TextInput
                  id="requiredResponderTypes"
                  name="requiredResponderTypes"
                  type="text"
                  value={newIncident.requiredResponderTypes.join(", ")}
                  onChange={handleChange}
                  placeholder=""
                />
              </div>
              <div>
                <Label htmlFor="requiredResponderQuantity">
                  Required Responder Quantity
                </Label>
                <TextInput
                  id="requiredResponderQuantity"
                  name="requiredResponderQuantity"
                  type="number"
                  value={newIncident.requiredResponderQuantity}
                  onChange={handleChange}
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={
                modalType === "addIncident" ? handleSubmit : handleUpdate
              }
            >
              {modalType === "addIncident" ? "Submit" : "Update"}
            </Button>
          </ModalFooter>
        </>
      )}
    </Modal>
  );
};

export default EmergencyModal;
