import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import baseAxios, { METHOD_HTTP } from "../../configs/BaseAxios";
import * as Yup from"yup";

const UserSchema = Yup.object().shape({
    username: Yup.string()
    // .min(2, 'phai lon hon 2 ky tu!')
    // .max(50, 'Too Long!')
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "khong dung dinh dang")
    .required('Required'),
    password:Yup.string().required('Required')
});

export function Register() {
    const Navigate = useNavigate();
    const submit =async (values) => {
        try{
            console.log("Date register" ,values)
        let data = await baseAxios(METHOD_HTTP.POST,"/register",values);
        console.log("Data",data);
        alert(data.message);
        Navigate("/login")
        } catch(e) {
            alert(e.message);
        }
        

    }
    return (
        <>
            <h1>Form Register</h1>
            <Formik
            initialValues={
                {
                    uesrname: '',
                    password: ''
                }
            }
            validationSchema={UserSchema}
            onSubmit={submit}
            >
                <Form>
                    <Field type="text" placeholder="Username" name="username"></Field>
                    <br/>
                    <span style={{color: "red"}}><ErrorMessage name={"username"}/></span>
                    <br/>
                    <Field type="password" placeholder="Password" name="password"></Field>
                    <br/>
                    <span style={{color: "red"}}><ErrorMessage name={"password"}/></span>
                    <br/>
                    <Link to={"/login"}>Login now?</Link>
                    <br/>
                    <br/>
                    <button>Submit</button>
                </Form>
            </Formik>
            
        </>
    )
}