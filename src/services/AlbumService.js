import client from "./http";

const resource = "/v1/albums";

export default {
  getPaginated(size, page) {
    return client.get(`${resource}/page?size=${size}&page=${page}`);
  },
  create(data) {
    return client.post(resource, data);
  },
  update(id, data) {
    return client.put(`${resource}/${id}`, data);
  },
  delete(id) {
    return client.delete(`${resource}/${id}`);
  },
  search(artistName) {
    return client.get(`${resource}/search?artistName=${artistName}`);
  },
  findById(id) {
    return client.get(`${resource}/${id}`);
  },
  addCover(id, data) {
    return client.put(`${resource}/${id}/covers`, data);
  },
  removeCover(objectName) {
    return client.delete(`${resource}/covers/${objectName}`);
  }
};
