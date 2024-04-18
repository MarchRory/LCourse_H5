import { request } from "@/utils/http/request";

export default {
  async setAvatar(file: never) {
    const formData = new FormData();
    formData.append("file", file);
    return request.post({
      url: "/data/file/upload",
      data: formData,
      headers: { "Content-type": "multipart/form-data" },
    });
  },
};
