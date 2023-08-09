import React from "react";
import { FormGroup, Label, Input, FormText } from "reactstrap";

function FormOlustur({ formData, handleChange }) {
  return (
    <>
      <FormGroup>
        <Label for="name">
          <b>Name: </b>
        </Label>
        <Input
          type="text"
          id="name"
          name="name"
          onChange={handleChange}
          value={formData.name}
          placeholder="Lütfen isim bilginizi giriniz."
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="surname">
          <b>Surname: </b>
        </Label>
        <Input
          className="label"
          type="text"
          id="surname"
          value={formData.surname}
          onChange={handleChange}
          name="surname"
          placeholder="Lütfen soyisim bilginizi giriniz."
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="email">
          <b>E-mail: </b>
        </Label>
        <Input
          className="label"
          type="email"
          id="email"
          name="email"
          onChange={handleChange}
          value={formData.email}
          placeholder="Lütfen email bilginizi giriniz."
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="password">
          <b>Password: </b>
        </Label>
        <Input
          className="label"
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Lütfen şifrenizi giriniz."
        />
      </FormGroup>

      <FormGroup>
        <Label>
          <b>Age: </b>

          <select
            className="selectOpt"
            name="age"
            id="age"
            onChange={handleChange}
            value={formData.age}
          >
            <option value="">Seçiniz</option>
            <option value="18-21">18-21</option>
            <option value="22-24">22-24</option>
            <option value="25-29">25-29</option>
            <option value="+30">+30</option>
          </select>
        </Label>
      </FormGroup>

      <FormGroup>
        <Label htmlFor="checkbox">
          <b>Terms </b>
        </Label>
        <Input
          className="checkbox"
          type="checkbox"
          id="checkbox"
          name="checkbox"
          checked={formData.terms}
          onChange={handleChange}
        />
      </FormGroup>

      <FormGroup>
        <Label for="exampleFile">
          <b>File: </b>
        </Label>
        <Input type="file" name="file" id="exampleFile" />
        <FormText color="muted">
          Eklemek istediğiniz bir dosya varsa dosyanızı seçebilirsiniz.
        </FormText>
      </FormGroup>
      <FormGroup check>
        <Label check>
          <Input type="checkbox" /> Check me out
        </Label>
      </FormGroup>
    </>
  );
}

export default FormOlustur;
