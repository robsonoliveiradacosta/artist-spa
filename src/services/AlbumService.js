import client from "./http";

const resource = "/v1/albums";

export default {
  getAll() {
    return client.get(resource);
  }
};
