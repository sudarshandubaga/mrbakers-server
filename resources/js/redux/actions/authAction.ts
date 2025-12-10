import callApi from "@/services";
import { AppDispatch } from "recharts/types/state/store";

export const doLogin =
    (phone: string, password: string, role: string = "admin") =>
    async (dispatch: AppDispatch) => {
        try {
            let apiResponse = await callApi("login", "POST", {
                data: {
                    phone,
                    password,
                    role,
                },
            });

            localStorage.setItem("@token", apiResponse?.token);

            dispatch({
                type: "LOGIN_SUCCESS",
                payload: {
                    user: apiResponse?.user,
                    token: apiResponse?.token,
                },
            });

            return {
                success: true,
                message: apiResponse?.message || "Login success",
            };
        } catch (error) {
            return {
                success: false,
                error,
            };
        }
    };

export const getUserInfo = () => async (dispatch: AppDispatch) => {
    let token = localStorage.getItem("@token");

    if (!token) {
        return null;
    }

    try {
        let user = await callApi("user");
        dispatch({
            type: "LOGIN_SUCCESS",
            payload: {
                token,
                user,
            },
        });
        return {
            success: true,
            token,
            user,
        };
    } catch (error) {
        return null;
    }
};
