import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Table,
} from "react-bootstrap";
import { useMutation, useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { BsFillFilePersonFill} from "react-icons/bs";
import { API } from "../config/api";

export default function Monitoring() {
  let navigate = useNavigate();

  let { data: penduduk, refetch } = useQuery("pendudukCache", async () => {
    const response = await API.get("/datapenduduk");
    return response.data;
  });

  const [idDelete, setIdDelete] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = (nik) => {
    setIdDelete(nik);
    handleShow();
  };

  const handleDeletes = () => {
    setConfirmDelete(true);
  };

  const deleteById = useMutation(async (nik) => {
    try {
      await API.delete("/datapenduduk/" + nik);
      refetch();
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    if (confirmDelete) {
      handleClose();
      deleteById.mutate(idDelete);
      setConfirmDelete(null);
    }
  }, [confirmDelete]);

  const handleDetail = (nik) => {
    navigate("/detail-data/" + nik);
  };
  const handleUpdate = (nik) => {
    navigate("/edit-data/" + nik);
  };

  const [filter, setFilter] = useState("");
  let searchData = (e) => {
    setFilter(e.target.value);
  };

  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  let dataFilter = penduduk?.filter((item) => {
    if (filter === "") {
      return item;
    } else if (item.nik.toLowerCase().includes(filter.toLowerCase())) {
      return item;
    } else if (item.name.toLowerCase().includes(filter.toLowerCase())) {
      return item;
    }
  });

  return (
    <div>
      <Container className="mt-3 ">
        <h3>
          <span>
          <BsFillFilePersonFill style={{ width: "30px",color: "grey" }} className="mb-2 me-3" alt="" />
          </span>
          Aplikasi Data Pribadi
        </h3>
        <Card className=" bg-search">
          <Card.Body>
            <Form>
              <Form.Group>
                <Form.Label className="t fw-bolder opacity-75">
                  NIK
                </Form.Label>
                <Form.Control
                  type="search"
                  id="nik"
                  name="nik"
                  style={{ width: "30%" }}
                  onChange={searchData.bind(this)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label className="fw-bolder opacity-75 mt-2">
                  Name
                </Form.Label>
                <Form.Control
                  type="search"
                  id="name"
                  name="name"
                  onChange={searchData.bind(this)}
                  style={{ width: "30%" }}
                />
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
        <Col className="text-end me-3">
          <Link to={"/add-data"}>
          <Button
              variant="primary"
              className="my-2 fw-bolder"
              style={{ width: "10%" }}
              onClick={() => handleDetail(item?.nik)}
            >
              Search
            </Button>
            <Button
              variant="primary"
              className="my-2 fw-bolder"
              style={{ width: "10%" }}
            >
              Add
            </Button>
          </Link>
        </Col>
        <Table responsive striped bordered hover className="text-center">
          <thead>
            <tr className="bg-primary opacity-90 text-black">
              <th>No</th>
              <th>NIK</th>
              <th>Full Name</th>
              <th>Age</th>
              <th>Date of Birth</th>
              <th>Gender</th>
              <th>Address</th>
              <th>Country</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {dataFilter?.map((item, index) => (
              <tr key={index} className="opacity-75">
                <td>{index + 1}</td>
                <td>{item?.nik}</td>
                <td>{item?.name}</td>
                <td>{getAge(item?.birth)}</td>
                <td>{item?.birth}</td>
                <td>{item?.gender}</td>
                <td>
                  {item.address}
                </td>
                <td>{item?.country}</td>
                <td className="d-flex gap-3">
                  <div
                    className="text-warning pointer"
                    onClick={() => handleDetail(item?.nik)}
                  >
                    Detail
                  </div>
                  <div
                    className="text-primary pointer "
                    onClick={() => {
                      handleUpdate(item?.nik);
                    }}
                  >
                    Edit
                  </div>
                  <div
                    className="text-danger pointer"
                    onClick={() => {
                      handleDelete(item?.nik);
                    }}
                  >
                    Delete
                  </div>
                  <Modal show={show} onHide={handleClose} centered>
                    <Modal.Body>
                      <h3 className="text-center">Delete Data</h3>
                      <div className="my-4">Are you sure delete your data? ?</div>
                      <div className="my-3 text-end">
                        <Button
                          variant="danger"
                          className="me-2"
                          style={{ width: "100px" }}
                          onClick={handleDeletes}
                        >
                          Ok
                        </Button>
                        <Button
                          variant="secondary"
                          style={{ width: "100px" }}
                          onClick={handleClose}
                        >
                          Cancel
                        </Button>
                      </div>
                    </Modal.Body>
                  </Modal>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}
