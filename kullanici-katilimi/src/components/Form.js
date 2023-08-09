import React, { useState, useEffect } from "react";
import axios from "axios";
import * as Yup from "yup";
import FormData from "./FormData";

function Form() {
  const [gelenData, setGelenData] = useState();

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    age: "",
    terms: false,
  });

  const [errors, setErrors] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    age: "",
    terms: false,
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

  const formSchema = Yup.object().shape({
    name: Yup.string().required("İsim zorunludur"),
    surname: Yup.string().required("Soyisim zorunludur"),
    email: Yup.string()
      .email("Bu email geçersiz!")
      .required("Lütfen E-posta adresinizi giriniz."),
    password: Yup.string()
      .required("Lütfen bir şifre oluşturun.")
      .min(6, "Şifreniz en az 6 karakterden uzun olmalıdır."),
    terms: Yup.boolean().oneOf(
      [true],
      "Kullanım şartlarını kabul etmelisiniz."
    ),
    age: Yup.number().required("Yaş zorunludur"),
    checkbox: Yup.boolean().oneOf([true], "Onay kutusunu işaretlemelisiniz."),
  });

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

  useEffect(() => {
    formSchema.isValid(formData).then((valid) => setDisabled(!valid));
  }, [formData, handleChange]);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const newPost = {
    name: formData.name.trim(),
    surname: formData.surname.trim(),
    email: formData.email.trim(),
    password: formData.password.trim(),
    age: formData.age,
    terms: formData.terms,
  };

  axios
    .post("https://reqres.in/api/user", newPost)
    .then((response) => {
      setGelenData(response.data);
      setFormData({
        name: "",
        surname: "",
        email: "",
        password: "",
        age: "",
        terms: false,
      });
    })
    .catch((err) => {
      console.log(err);
    });

  return (
    <div className="Container">
      <div className="form-Container">
        <h2>Örnek Form </h2>
        <hr />
        <div style={{ color: "red" }}>
          <div>{errors.name}</div>
          <div>{errors.surname}</div>
          <div id="error-email">{errors.email}</div>
          <div id="error-password">{errors.password}</div>
        </div>
        <div className="textLeft">
          <form onSubmit={handleSubmit}>
            <FormData handleChange={handleChange} formData={formData} />
            <div className="flex">
              <input
                id="submit"
                type="submit"
                value="Submit"
                className="submit"
                disabled={disabled}
              />
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
              <p>{gelenData.name}</p>
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
          </div>
        )}
      </div>
    </div>
  );
}

export default Form;
