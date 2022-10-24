import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useMutation, useQuery } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BsFillFilePersonFill} from "react-icons/bs";
import { API } from "../config/api";

export default function EditPages() {
  let navigate = useNavigate();

  const { nik } = useParams();

  const [form, setForm] = useState({
    nik: "",
    name: "",
    birth: "",
    gender: "",
    address: "",
    country: "",
    colour: "",
    fuel: "",
  });

  let { data: datapenduduk1 } = useQuery("datapenduduk2", async () => {
    const response = await API.get("/datapenduduk/" + nik);
    setForm({
      ...form,
      nik: response.data.nik,
      name: response.data.name,
      birth: response.data.birth,
      gender: response.data.gender,
      address: response.data.address,
      country: response.data.country,
      colour: response.data.colour,
      fuel: response.data.fuel,
    });
    return response
  });
  console.log(datapenduduk1);

  const handleInput = (e) => {
    if (e.target.value.length > e.target.maxLength)
      e.target.value = e.target.value.slice(0, e.target.maxLength);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      await API.patch("/datapenduduk", form);
      alert("data berhasil dirubah");
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
        <h5 className="my-3">Edit Data Pribadi</h5>
        <Form onSubmit={(e) => handleSubmit.mutate(e)}>
          <Row>
            <Col>
              <Row>
                <Col xs={12} md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>NIK</Form.Label>
                    <Form.Control
                      type="text"
                      name="nik"
                      id="nik"
                      value={form.nik}
                      onChange={handleChange}
                      disabled
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      id="name"
                      value={form.name}
                      onChange={handleChange}
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
                value= "Laki-laki"
                onChange={handleChange}
                checked={form.gender === "Laki-laki"}
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
                checked={form.gender === "Perempuan"}
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
                      name="birth"
                      id="birth"
                      value={form.birth}
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
                      name="address"
                      id="address"
                      value={form.address}
                      onChange={handleChange}
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
            value={form.country}
          >
            <option value="" selected disabled>
              -- Pilih Negara --
            </option>
            <option value="Indonesia">Indonesia</option>
            <option value="Malaysia">Malaysia</option>
            <option value="Singapura">Singapura</option>
            <option value="Jerman">Jerman</option>
            <option value="Inggris">Inggris</option>
            <option value="Brazil">Brazil</option>
            <option value="Jepang">Jepang</option>
            <option value="China">China</option>
          </select>
                </Col>
              </Row>
              <Button type="submit" style={{ width: "100px" }}>
                Edit
              </Button>
              <Link to={"/"}>
                <Button
                  variant="secondary"
                  className="ms-2"
                  style={{ width: "100px" }}
                >
                  Back
                </Button>
              </Link>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
}
