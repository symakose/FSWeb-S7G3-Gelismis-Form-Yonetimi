import React, { useState, useEffect } from "react";
import axios from "axios";
import * as Yup from "yup";
import FormData from "./FormData";
import "./Form.css";
import { Button } from "reactstrap";

const formSchema = Yup.object().shape({
  firstname: Yup.string().required("İsim zorunludur"),
  surname: Yup.string().required("Soyisim zorunludur"),
  email: Yup.string().email().required("Lütfen E-posta adresinizi giriniz."),
  password: Yup.string()
    .min(6, "Şifreniz en az 6 karakterden uzun olmalıdır.")
    .required("Şifre zorunludur."),
  age: Yup.number().required("Yaş bilgisi seçmek zorunludur."),
  checkbox: Yup.boolean().oneOf([true], "Onay kutusunu işaretlemelisiniz."),
  file: Yup.mixed().test("fileType", "Desteklenmeyen dosya türü", (value) => {
    if (!value) return true;

    const allowedFileTypes = ["image/jpeg", "image/png", "application/pdf"];
    return allowedFileTypes.includes(value.type);
  }),
});

function Form() {
  const [gelenData, setGelenData] = useState();

  const [formData, setFormData] = useState({
    firstname: "",
    surname: "",
    email: "",
    password: "",
    age: "",
    checkbox: false,
    file: null,
  });

  const [errors, setErrors] = useState({
    firstname: "",
    surname: "",
    email: "",
    password: "",
    age: "",
    checkbox: "",
    file: "",
  });

  const checkFormErrors = (name, value) => {
    Yup.reach(formSchema, name)
      .validate(value)
      .then(() => {
        setErrors({
          ...errors,
          [name]: "",
        });
      })
      .catch((err) => {
        setErrors({
          ...errors,
          [name]: err.errors[0],
        });
      });
  };

  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    formSchema.isValid(formData).then((valid) => setDisabled(!valid));
  }, [formData]);

  const handleChange = (event) => {
    const { checked, name, value, type } = event.target;
    const valueToUse = type === "checkbox" ? checked : value;
    checkFormErrors(name, valueToUse);
    setFormData({
      ...formData,
      [name]: valueToUse,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("https://reqres.in/api/user", formData)
      .then((response) => {
        setGelenData(response.data);
        setFormData({
          firstname: "",
          surname: "",
          email: "",
          password: "",
          age: "",
          checkbox: false,
          file: null,
        });
        setErrors({
          firstname: "",
          surname: "",
          email: "",
          password: "",
          age: "",
          checkbox: "",
          file: null,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const isValid = async () => {
      const valid = await formSchema.isValid(formData);
      setDisabled(!valid);
    };
    isValid();
  }, [formData]);

  return (
    <div className="Container">
      <div className="form-Container">
        <h2>Örnek Form </h2>
        <hr />
        <div style={{ color: "red" }}>
          <div>{errors.firstname}</div>
          <div>{errors.surname}</div>
          <div id="error-email">{errors.email}</div>
          <div id="error-password">{errors.password}</div>
        </div>
        <div className="textLeft">
          <form onSubmit={handleSubmit}>
            <FormData handleChange={handleChange} formData={formData} />
            <div className="flex">
              <Button onClick={handleSubmit}>
                <input
                  id="submit"
                  type="submit"
                  className="submit"
                  disabled={disabled}
                />
              </Button>
            </div>
          </form>
        </div>
      </div>
      <div>
        {gelenData && (
          <div className="data">
            <div>
              <p>
                <b>Name: </b>
              </p>
              <p>{gelenData.firstname}</p>
            </div>
            <div>
              <p>
                <b>Surname: </b>
              </p>
              <p>{gelenData.surname}</p>
            </div>
            <div>
              <p>
                <b>Email: </b>
              </p>
              <p>{gelenData.email}</p>
            </div>
            <div>
              <p>
                <b>Age: </b>
              </p>
              <p>{gelenData.age}</p>
            </div>
            <div>
              <p>
                <b>File: </b>
              </p>
              <p>{gelenData.file}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Form;
