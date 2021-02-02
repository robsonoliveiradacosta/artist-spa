import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:8081",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

export default client;
