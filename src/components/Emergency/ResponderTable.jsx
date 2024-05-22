import React from "react";
import { Button, Table } from "flowbite-react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

const ResponderTable = ({ responders, handleAllocate }) => {
  return (
    <div className="overflow-auto max-h-[300px]">
      <Table hoverable className="shadow-md w-full">
        <Table.Head>
          <Table.HeadCell className="w-[20%]">Full name</Table.HeadCell>
          <Table.HeadCell className="w-[20%]">Area</Table.HeadCell>
          <Table.HeadCell className="w-[20%]">City</Table.HeadCell>
          <Table.HeadCell className="w-[20%]">Profession</Table.HeadCell>
          <Table.HeadCell className="w-[10%]">Availability</Table.HeadCell>
          <Table.HeadCell className="w-[10%]">Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {responders.map((responder) => (
            <Table.Row key={responder._id} className="hover:bg-gray-100">
              <Table.Cell className="bg-gray-50 dark:bg-gray-700 font-bold w-[20%]">
                {responder.user ? responder.user.fullName : "Unknown"}
              </Table.Cell>
              <Table.Cell className="w-[20%]">
                {responder.user ? responder.user.area : "Unknown"}
              </Table.Cell>
              <Table.Cell className="w-[20%]">
                {responder.user ? responder.user.city : "Unknown"}
              </Table.Cell>
              <Table.Cell className="w-[20%]">
                {responder.responderType}
              </Table.Cell>
              <Table.Cell className="w-[10%]">
                {responder.availability ? (
                  <AiOutlineCheck className="text-green-500" />
                ) : (
                  <AiOutlineClose className="text-red-500" />
                )}
              </Table.Cell>
              <Table.Cell className="w-[10%]">
                <Button
                  disabled={responder.allocated}
                  onClick={() => handleAllocate(responder._id)}
                >
                  {responder.allocated ? "Allocated" : "Allocate"}
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default ResponderTable;
