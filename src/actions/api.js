import { configure } from "@testing-library/react";
import axios from "axios";

const baseUrl = "http://localhost:5000/api/"
const options = {
    headers: {'Content-Type': 'application/json'}
  };

export default {
    Customer(url=baseUrl + 'customer/'){
        return {
            fetchAll: () => axios.get(url),
            fetchById: id => axios.get(url + id),
            create: newRecord => axios.post(url, newRecord, options),
            update: (id, updateRecord) => axios.put(url + id, updateRecord),
            delete: id => axios.delete(url + id)
        }
    }
}