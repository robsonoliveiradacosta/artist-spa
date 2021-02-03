import client from "./http";

const resource = "/v1/albums";

export default {
  getPaginated(size, page) {
    return client.get(`${resource}/page?size=${size}&page=${page}`);
  }
};
