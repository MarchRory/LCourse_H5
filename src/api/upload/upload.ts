import request from "@/utils/http/request";

export default {
  async setAvatar(file: never) {
    const formData = new FormData();
    formData.append("file", file);
    return request({
      url: "/data/file/upload",
      data: formData,
      method: "post",
      headers: { "Content-type": "multipart/form-data" },
    });
  },
};
