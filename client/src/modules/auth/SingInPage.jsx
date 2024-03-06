import React, { useContext } from "react";
import { Button, Card, Label, TextInput, Spinner } from "flowbite-react";
import { replace, useFormik } from "formik";
import * as yup from "yup";
import { customAlertError, customAlertSuccess } from "../../config/alert/alert";
import AxiosClient from '../../config/http-gateway/http-client'
import AuthContext from "../../config/context/auth-context";
import { useNavigate } from "react-router-dom";
// tailwindcss - flowbite-react
// Interfaz para iniciar Sesion

export default function SingInPage() {
  
  const {user, dispatch} = useContext(AuthContext);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      username: yup.string().required("Campos Obligatorios"),
      password: yup.string().required("Campos Obligatorios"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
        console.log(values);
        try {
          const response = await AxiosClient({
            url: '/auth/signin',
            method: 'POST',
            data: values,
          })
  
          if (!response?.error) {
            dispatch({ type: "SIGNIN", payload: response.data });
            console.log(response.data);
            const { roles } = response.data;
            const { user } = response.data;
            const { person } = user;
  
            if (roles.some(role => role.name === "USER_ROLE")) {
              localStorage.setItem("userRole", "USER_ROLE");
              localStorage.setItem("username", person.name);
              navigate("/user", { replace: true });
            } else if (roles.some(role => role.name === "ADMIN_ROLE")) {
              localStorage.setItem("userRole", "ADMIN_ROLE");
              localStorage.setItem("username", person.name);
              navigate("/admin", { replace: true });
            } else if (roles.some(role => role.name === "CLIENT_ROLE")) {
              localStorage.setItem("userRole", "CLIENT_ROLE");
              localStorage.setItem("username", person.name);
              navigate("/client", { replace: true });
            }
          } else {
            throw Error('Error');
          }
  
        } catch (error) {
          console.log(error);
          customAlert("Iniciar sesion", "Usuario y/o contraseña incorrectos", 'error')
        } finally {
          setSubmitting(false)
        }
      },
  });

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Card>
        <form
          className="flex flex-col gap-4"
          noValidate
          onSubmit={formik.handleSubmit}
        >
          <div>
            <div className="mb-2 block">
              <Label htmlFor="username" value="Username" />
            </div>
            <TextInput
              name="username"
              id="username"
              type="text"
              placeholder="your username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              helperText={
                formik.errors.username && formik.touched.username ? (
                  <span className="font-medium text-red-600">
                    {formik.errors.username}
                  </span>
                ) : null
              }
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Password" />
            </div>
            <TextInput
              name="password"
              id="password"
              type="password"
              placeholder="your password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              helperText={
                formik.errors.password && formik.touched.password ? (
                  <span className="font-medium text-red-600">
                    {formik.errors.password}
                  </span>
                ) : null
              }
            />
          </div>
          <Button
            type="submit"
            className="submit"
            disabled={formik.isSubmitting || !formik.isValid}
          >
            {formik.isSubmitting ? <Spinner /> : <>Iniciar Sesión</>}
          </Button>
        </form>
      </Card>
    </div>
  );
}
