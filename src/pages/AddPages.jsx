import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
// import icon from "../assets/iconapp.svg";
import { BsFillFilePersonFill} from "react-icons/bs";
import { API } from "../config/api";

export default function AddPages() {
  let navigate = useNavigate();

  const [form, setForm] = useState({
    nik: "",
    name: "",
    address: "",
    birth: "",
    gender: "",
    country: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleInput = (e) => {
    if (e.target.value.length > e.target.maxLength)
      e.target.value = e.target.value.slice(0, e.target.maxLength);
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      await API.post("/datapenduduk", form);
      alert("data berhasil tersimpan");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div>
      <Container className="mt-3 opacity-75">
        <h3>
          <span>
            <BsFillFilePersonFill style={{ width: "30px" }} className="m-3" alt="" />
          </span>
          Aplikasi Data Pribadi
        </h3>
        <h5 className="my-3">Tambah Data Baru</h5>
        <Form onSubmit={(e) => handleSubmit.mutate(e)}>
          <Row>
            <Col>
              <Row>
                <Col xs={12} md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>NIK</Form.Label>
                    <Form.Control
                      type="text"
                      id="nik"
                      name="nik"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      id="name"
                      name="name"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                
          <div className="flex flex-col mb-3">
            <label htmlFor="" className="mb-2">
              Gender
            </label>
            <div>
              <input
                type="radio"
                name="gender"
                id="male"
                value="Laki-laki"
                onChange={handleChange}
                required
              />
              <label htmlFor="male" className=" me-5 ms-1">
                Laki-Laki
              </label>

              <input
                type="radio"
                name="gender"
                id="female"
                value="Perempuan"
                onChange={handleChange}
              />
              <label htmlFor="female" className="mr-3 ms-1">
                Perempuan
              </label>
            </div>
          </div>

                  <Form.Group className="mb-3">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                      type = "date"
                      rows={3}
                      id="birth"
                      name="birth"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      as="textarea"
                      id="address"
                      name="address"
                      onInput={handleInput}
                      maxLength={500}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

          <label htmlFor="country" className="mb-2 me-3">
            Negara
          </label>
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:outline-orange-600 w-full px-4 py-2 mb-3"
            name="country"
            id="country"
            onChange={handleChange}
            required
          >
            <option value="" selected disabled>
              -- Pilih Negara --
            </option>
            <option value="Indonesia">Indonesia</option>
            <option value="Malaysia">Malaysia</option>
     
          </select>

                </Col>
              </Row>
              <Button type="submit" style={{ width: "100px" }}>
                Simpan
              </Button>
              <Link to={"/"}>
                <Button
                  variant="secondary"
                  className="ms-2"
                  style={{ width: "100px" }}
                >
                  Kembali
                </Button>
              </Link>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
}
