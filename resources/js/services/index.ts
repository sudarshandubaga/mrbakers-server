import axios from "axios";
import { API_BASE } from "@/utils/constants.utils";
import { toast } from "react-toastify";

export default async function callApi(
    url: string,
    method: string = "GET",
    params: any = {}
) {
    const data = params.data || null;
    const isGuest = params.is_guest || false;

    // Create axios instance
    const instance = axios.create({
        baseURL: API_BASE,
        headers: {
            Accept: "application/json",
        },
    });

    // Attach bearer token if NOT guest
    if (!isGuest) {
        const token = localStorage.getItem("@token");
        if (token) {
            instance.defaults.headers["Authorization"] = `Bearer ${token}`;
        }
    }

    try {
        const response = await instance.request({
            url,
            method,
            ...(method === "GET" ? { params: data } : { data }),
        });

        return response.data; // success
    } catch (error: any) {
        if (error.response) {
            const msg = error.response.data?.message || "Something went wrong!";
            // console.error("API Error: ", msg);

            // toast.error(msg);
            throw msg;
        } else {
            // toast.error("Network error");

            throw "Network error";
        }

        return null; // do not return error object
    }
}
