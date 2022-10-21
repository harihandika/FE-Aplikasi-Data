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

export default function Monitoring12() {
  let navigate = useNavigate();
  const [filter, setFilter] = useState([]);

  let { data: penduduk, refetch } = useQuery("pendudukCache", async () => {
    const response = await API.get("/datapenduduk");
    setFilter(response.data)
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

  const [form, setForm] = useState({
    nik: "",
    name: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify(form);
      const response = await API.post("/datapenduduk/search",body, config );
      console.log("ini respon", response)

      if (response.status === 200) {
        setFilter(response.data)
      }
    } catch (error) {
      console.log(error);
    }
  });
  
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

  useEffect(() => {
    if (form.nik == "" && form.name == "0") {
      setFilter(penduduk)
    }
  }, [penduduk]);

  const handleDetail = (nik) => {
    navigate("/detail-data/" + nik);
  };
  const handleUpdate = (nik) => {
    navigate("/edit-data/" + nik);
  };

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

  console.log(filter);
  // let dataFilter = penduduk?.filter((item) => {
  //   if (filter === "") {
  //     return item;
  //   } else if (item.nik.toLowerCase().includes(filter.toLowerCase())) {
  //     return item;
  //   } else if (item.name.toLowerCase().includes(filter.toLowerCase())) {
  //     return item;
  //   }
  // });
let address = penduduk?.map((item) => {
  if (item.address.length >= 30){
    return item.address.substring(0,30) + "..."
  }else {
    return item.address
  }
})
console.log("ini des", address)

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
            <Form onSubmit={(e) => handleSubmit.mutate(e)}>
              <Form.Group>
                <Form.Label className="t fw-bolder opacity-75">
                  NIK
                </Form.Label>
                <Form.Control
                  type="text"
                  id="nik"
                  name="nik"
                  style={{ width: "30%" }}
                  onChange={handleChange}
                  // onChange={searchData.bind(this)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label className="fw-bolder opacity-75 mt-2">
                  Name
                </Form.Label>
                <Form.Control
                  type="text"
                  id="name"
                  name="name"
                  onChange={handleChange}
                  // onChange={searchData.bind(this)}
                  style={{ width: "30%" }}
                />
              </Form.Group>
        <Col className="text-end">
          <Button
          type="submit"
              variant="primary"
              className="my-2 fw-bolder me-3"
              style={{ width: "10%" }}
              // onClick={handleSubmit}
            >
              Search
            </Button>
          <Link to={"/add-data"}>
            <Button
              variant="primary"
              className="my-2 fw-bolder"
              style={{ width: "10%" }}
            >
              Add
            </Button>
          </Link>
        </Col>
            </Form>
          </Card.Body>
        </Card>
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
            {filter?.map((item, index) => (
              <tr key={index} className="opacity-75">
                <td>{index + 1}</td>
                <td>{item?.nik}</td>
                <td>{item?.name}</td>
                <td>{getAge(item?.birth)}</td>
                <td>{item?.birth}</td>
                <td>{item?.gender}</td>
                <td>
                  {item?.address.length >= 30 ? item.address.substring(0,30) + "..." : item.address }
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
