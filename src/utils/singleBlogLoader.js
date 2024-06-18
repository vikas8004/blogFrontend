import axios from "axios";
import { baseUrl } from "./constants";
export const singleBlogLoader = async ({ params }) => {
  const { id } = params;

  const res = await axios.get(`${baseUrl}/api/v1/post/${id}`);
  // console.log(res.data);
  return res.data.data;
};
