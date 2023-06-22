import axios from "axios";
import { BASE_API_URL } from "../config/constant/apiConstant.js";
import Chance from "chance";
const chance = Chance();

export const URL = axios.create({
  baseURL: BASE_API_URL
});

const token = localStorage.getItem("token");
if (token) {
  URL.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export const fakeUserData = () => {
  return chance.name({ middle: true });
};
