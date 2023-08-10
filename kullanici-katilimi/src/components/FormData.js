import React from "react";
import { FormGroup, Label, Input, Col, FormText } from "reactstrap";

function FormData({ formData, handleChange }) {
  return (
    <>
      <FormGroup row>
        <Label htmlFor="firstname" sm={2}>
          <b>Name: </b>
        </Label>
        <Col sm={10}>
          <Input
            className="label"
            type="text"
            id="firstname"
            name="firstname"
            onChange={handleChange}
            value={formData.firstname}
            placeholder="Lütfen isim bilginizi giriniz."
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label htmlFor="surname" sm={2}>
          <b>Surname: </b>
        </Label>
        <Col sm={10}>
          <Input
            className="label"
            type="text"
            id="surname"
            value={formData.surname}
            onChange={handleChange}
            name="surname"
            placeholder="Lütfen soyisim bilginizi giriniz."
          />
        </Col>
      </FormGroup>

      <FormGroup row>
        <Label htmlFor="email" sm={2}>
          <b>E-mail: </b>
        </Label>
        <Col sm={10}>
          <Input
            className="label"
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
            placeholder="Lütfen email bilginizi giriniz."
          />
        </Col>
      </FormGroup>

      <FormGroup row>
        <Label htmlFor="password" sm={2}>
          <b>Password: </b>
        </Label>
        <Col sm={10}>
          <Input
            className="label"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Lütfen şifrenizi giriniz."
          />
        </Col>
      </FormGroup>

      <FormGroup>
        <Label sm={2}>
          <b>Age: </b>
          <Col sm={10}>
            <select
              className="selectOpt"
              name="age"
              id="age"
              onChange={handleChange}
              value={formData.age}
            >
              <option value="">Yaşınızı Seçiniz</option>
              <option value="18-21">18-21</option>
              <option value="22-24">22-24</option>
              <option value="25-29">25-29</option>
              <option value="+30">+30</option>
            </select>
          </Col>
        </Label>
      </FormGroup>
      <FormGroup row>
        <Label for="file" sm={2}>
          <b>File:</b>
        </Label>
        <Col sm={10}>
          <Input
            type="file"
            id="file"
            name="file"
            onChange={handleChange}
            accept=".jpg, .jpeg, .png, .pdf"
          />
          {formData.file && <FormText>{formData.file.name}</FormText>}
        </Col>
      </FormGroup>

      <FormGroup>
        <Label htmlFor="checkbox">
          <b>Terms of Service: </b>
        </Label>

        <Input
          className="checkbox"
          type="checkbox"
          id="checkbox"
          name="checkbox"
          checked={formData.checkbox}
          onChange={handleChange}
        />
      </FormGroup>
    </>
  );
}

export default FormData;
