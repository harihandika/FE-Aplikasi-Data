import React, { useEffect, useState } from "react";
import { Button, Card, Container, Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { BsFillFilePersonFill} from "react-icons/bs";
import { API } from "../config/api";

export default function DetailPages() {
  let navigate = useNavigate();
  const { nik } = useParams();

  const [dataPendudukId, setdataPendudukId] = useState([]);
  useEffect(() => {
    const dataPendudukId = async () => {
      try {
        const response = await API.get("/datapenduduk/" + nik);
        setdataPendudukId(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    dataPendudukId();
  }, [setdataPendudukId]);

  console.log(dataPendudukId);

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

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div>
      <Container className="mt-3">
        <h3>
          <span>
          <BsFillFilePersonFill style={{ width: "30px" }} className="m-3" alt="" />
          </span>
          Aplikasi Data Pribadi
        </h3>
        <h5 className="my-3">Detail Data Pribadi</h5>
        <div className="d-flex justify-content-center">
          <Card className="bg-detail">
            <Card.Body>
              <Table responsive striped bordered hover className="text-star">
              <h5>
                <tr className="bg-white">
              <th>NIK :</th>
              <th>{dataPendudukId.nik}</th>
              </tr>
              <tr className="bg-white">
              <th>Full Name : </th>
              <th>{dataPendudukId.name}</th>
              </tr>
              <tr className="bg-white">
              <th>Age : </th>
              <th>{getAge(dataPendudukId.birth)}</th>
              </tr>
              <tr className="bg-white">
              <th>Date of Birth :</th>
              <th>{dataPendudukId.birth}</th>
              </tr>
              <tr className="bg-white">
              <th>Gender :</th>
              <th>{dataPendudukId.gender}</th>
              </tr>
              <tr className="bg-white">
              <th>Address :</th>
              <th>{dataPendudukId.address}</th>
              </tr>
              </h5>
              </Table>
            </Card.Body>
          </Card>
        </div>
        <Button onClick={handleBack} className="my-3">
          Back
        </Button>
      </Container>
    </div>
  );
}
