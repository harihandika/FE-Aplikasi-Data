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

  // const [state, setState] = useState([]);
  // const urlFetch = fetch('https://dummyjson.com/products')
  //   urlFetch.then( res => {
  //      if(res.status === 200)
  //         return res.json()   
  //   }).then( resJson => {
  //      this.setState({
  //          data: resJson
  //      })
  //   })
  // const [filter, setFilter] = useState([]);

    let { data: penduduk, refetch } = useQuery("pendudukCaches", async () => {
      const response = await API.get("https://dummyjson.com/products");
      // setFilter(response.data.products)
      console.log(response.data.products)
      return response.data.products;
    });

 
  return (
    <div>
      <Container className="mt-3 ">
      <thead>
            <tr className="bg-primary opacity-90 text-black">
              <th>id</th>
              <th>title</th>
              <th>description</th>
              <th>price</th>
              <th>rating</th>
              <th>stock</th>
              <th>brand</th>
              <th>category</th>
            </tr>
          </thead>
          <tbody>
      {penduduk?.map((item, index) => (
              <tr key={index} className="opacity-75">
                <td>{item?.id}</td>
                <td>{item?.title}</td>
                <td>{item?.description}</td>
                <td>{item?.price}</td>
                <td>{item?.rating}</td>
                <td>{item?.stock}</td>
                <td>{item?.brand}</td>
                <td>{item?.category}</td>
              </tr>
            ))}
            </tbody>
      </Container>
    </div>
  );
}
