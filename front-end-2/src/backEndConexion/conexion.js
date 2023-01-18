/* eslint-disable prettier/prettier */
import axios from "axios";

export default async function getExcelInfo(body) {
  try {
    // En mi computadora sólo pongo "/"
    const res = await axios
      .post("/", body)
      .then((res) => res.data);
    return res;
  } catch (error) {
    console.log("💥💥💥  file: conexion.js:9  error", error.message);
  }
}

