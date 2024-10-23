import { Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom"

import React, { useContext } from 'react';

import baseAxios, { METHOD_HTTP } from "../../configs/BaseAxios";
import { InfoContext } from "../context/infoContext";


export function Login() {
    const navigate = useNavigate();
    const { setUser } = useContext(InfoContext);

    const submit = async (values) => {
        try {
            let data = await baseAxios(METHOD_HTTP.POST, "/login", values);
            localStorage.setItem("token", data.token);
            await getInfo();
            navigate("/home");
        } catch (e) {
            alert(e.message);
        }
    }
    
    const getInfo = async () => {
        let data = await baseAxios(METHOD_HTTP.GET, "get-info");
        setUser(data);
    }

    return (
        <>
            <h1>Form Login</h1>
            <Formik
                initialValues={
                    {
                        username: '',
                        password: ''
                    }
                }
                onSubmit={submit}
            >
                <Form>
                    <Field type="text" placeholder="Username" name="username"></Field>
                    <br />
                    <Field type="password" placeholder="Password" name="password"></Field>
                    <br />
                    <Link to={"/register"}>Register now?</Link>
                    <br />
                    <br />
                    <button>Submit</button>
                </Form>
            </Formik>

        </>
    )
}