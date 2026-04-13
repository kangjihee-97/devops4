import api from "./api";

export const boardApi = {
  getList: (pageNum: number) =>
    api.get(`/list?pageNum=${pageNum}`).then((res) => res.data),

  getDetail: (id: number) => api.get(`/detail/${id}`).then((res) => res.data),

  insert: (formData: FormData) => api.post("/insert", formData),

  update: (formData: FormData) => api.put("/update", formData),

  delete: (id: number) => api.delete(`/delete/${id}`),
};
