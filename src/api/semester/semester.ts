import { request } from "@/utils/http/request";
enum API {
  semesterNow = "/curriculum/semester/now",
}
export default {
  async getSemesterNow() {
    return await request.get({
      url: API.semesterNow,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  },
};
