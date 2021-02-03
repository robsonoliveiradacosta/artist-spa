import client from "./http";

const resource = "/v1/artists";

export default {
  getAll() {
    return client.get(resource);
  },
  create(data) {
    return client.post(resource, data);
  },
  update(id, data) {
    return client.put(`${resource}/${id}`, data);
  },
  delete(id) {
    return client.delete(`${resource}/${id}`);
  }
};
