import axios from "axios";
import "./Form.css"
import { useEffect, useState } from "react";
import * as Yup from "yup";
import KullanıcılarListesi from "./KullanıcılarListesi";
import { Button, Form, FormFeedback, Input, Label } from "reactstrap";
const initialObject = {
  name: "",
  email: "",
  password: "",
  tos: false,
  select:""
};
const initialObjectError = {
  name: "",
  email: "",
  password: "",
  tos: false,
  select:""
};

const Form1 = (props) => {
  const {deneme}=props;
  const [product, setProduct] = useState(initialObject);
  const [formErrors, setFormErrors] = useState(initialObjectError);
  const [formValid, setFormValid] = useState(false);

  const formSchema = Yup.object().shape({
   
    // required isn't required for checkboxes.

    name: Yup.string().required("İsim Soyisim alanı boş bırakılamaz.").min(3,"İsim uzunluğu 3 karakterden az olmaz"),
   

    email:Yup.string()
      .email("Lütfen geçerli bir e-mail giriniz.")
      .required("e-mail alanı boş bırakılamaz."),

    password:Yup.string()
      .required("password alanı boş bırakılamaz.")
      .min(6, "Password uzunluğu 6 karakterden az olmaz"),

    tos: Yup.boolean().oneOf(
      [true],
      "Kullanım şartlarını onaylamanınız gerekmektedir."
    ),
    select:Yup.string()
    .required("Lütfen kulanıcının rolünü belirtiniz")
  });

  const handlerSumbmit = (e) => {
    e.preventDefault();
    console.log("kaydedilen kişi", product);
    axios.post("https://reqres.in/api/users",product)
    .then((res)=>{
      console.log("data:",res.data);
      deneme(res.data);
    })
    .catch((err)=>{
      console.warn("kullanıcı kaydedilemedi",err.message);
    })
    setProduct(initialObject);
  };

  const changeHandler = (e) => {
    const { name, value, checked, type } = e.target;

    const newProduct = type === "checkbox" ? checked : value;

    setProduct({ ...product, [name]: newProduct });

    Yup.reach(formSchema, name)
      .validate(newProduct)
      .then((valid) => {
        setFormErrors({ ...formErrors, [name]: "" });
      })
      .catch((err) => {
        setFormErrors({ ...formErrors, [name]: err.errors[0] });
      });
  };
  useEffect(() => {
    
    formSchema.isValid(product).then((valid) => setFormValid(valid));
    console.log("bilgi",product);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  return (
    <Form onSubmit={handlerSumbmit} className="form">
      <h1 className="title">Kullanıcı ekle</h1>
        <Label>
          İsim-Soyisim:
          </Label>
          <Input
            name="name"
            type="text"
            value={product.name}
            onChange={changeHandler}
            invalid={!!formErrors.name}
            data-cy="test_name"
          ></Input>
      <FormFeedback>{formErrors.name}</FormFeedback>

      <div>
        <Label>
          Email:
          </Label>
          <Input
            name="email"
            type="email"
            value={product.email}
            onChange={changeHandler}
            invalid={!!formErrors.email} 
            data-cy="test_email"
          ></Input>
        
      </div>
      <FormFeedback>{formErrors.email}</FormFeedback>


      <div>
        <Label>
          Password:
          </Label>
          <Input
            name="password"
            type="password"
            value={product.password}
            onChange={changeHandler}
            invalid={!!formErrors.password} 
            data-cy="test_password"
          ></Input>
      </div>
      <FormFeedback>{formErrors.password}</FormFeedback>

      <div>
        <Label>
          Kullanım Şartları: 
          </Label>

          <Input
            name="tos"
            type="checkbox"
            checked={product.tos}
            onChange={changeHandler}
            invalid={!!formErrors.tos} 
            data-cy="test_tos"
          ></Input>
        
      </div>
      <FormFeedback>{formErrors.tos}</FormFeedback>

      <Input
      id="exampleSelect"
      name="select"
      value={product.select}
      onChange={changeHandler}
      type="select"
      invalid={!!formErrors.select} 
      data-cy="test_select"
    >
       <option value={""} disabled>
     Lütfen rolü seçiniz..
      </option>
      <option>
       Mühendis
      </option>
      <option>
        Yönetici
      </option>
      <option>
        Muhasebeci
      </option>
    </Input>
    <FormFeedback>{formErrors.select}</FormFeedback>
    <div className="button">
      <Button   color="primary" type="sumbit" disabled={!formValid}>
        Sumbit
      </Button>
    </div>
      
    </Form>
  );
};
export default Form1;
