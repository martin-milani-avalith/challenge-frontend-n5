import { useState } from "react";

import "./newProductForm-styles.scss";
import Swal from "sweetalert2";
import { useBoundStore } from "../../core/store";
import { Link } from "react-router-dom";

function NewProductForm() {
  const initialValues = {
    name: "",
    price: "",
    amount: "",
  };
  const products = useBoundStore((state) => state.products);
  const addNewProduct = useBoundStore((state) => state.addNewProduct);
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleValidation = () => {
    const fields = values;
    const formErrors = {};
    let formIsValid = true;

    // Name
    if (!fields.name) {
      formIsValid = false;
      formErrors.name = "El nombre no puede estar vacio";
    }

    // Price
    if (!fields.price) {
      formIsValid = false;
      formErrors.price = "El precio no puede estar vacio";
    } else if (Number(fields.price) === 0) {
      formIsValid = false;
      formErrors.price = "El precio no puede ser 0";
    }

    // Amount
    if (!fields.amount) {
      formIsValid = false;
      formErrors.amount = "La cantidad no puede estar vacia";
    } else if (Number(fields.amount) === 0) {
      formIsValid = false;
      formErrors.amount = "La cantidad no puede ser 0";
    } else if (!Number.isInteger(Number(fields.amount))) {
      formIsValid = false;
      formErrors.amount = "La cantidad tiene que ser un número entero";
    }

    setErrors(formErrors);
    return formIsValid;
  };

  const alreadyExist = (newProductName) => {
    return products.findIndex((element) => element.name === newProductName);
  };

  const handleSubmit = () => {
    if (handleValidation()) {
      if (alreadyExist(values.name) < 0) {
        const newProduct = {
          name: values.name,
          price: Number(values.price),
          amount: Number(values.amount),
          id: products.length + 1,
        };
        Swal.fire({
          title: "Desea agregar un nuevo producto?",
          html: `<p>Nombre: ${values.name}</p><p>Precio: ${values.price}</p><p>Cantidad: ${values.amount}</p>`,
          showCancelButton: true,
          confirmButtonText: "Confirmar",
          cancelButtonText: "Cancelar",
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: "Producto creado con éxito!",
              icon: "success",
            });
            addNewProduct(newProduct);
            setValues(initialValues);
          }
        });
      } else {
        Swal.fire({
          title: "Oops...",
          text: "El producto ya existe",
          icon: "warning",
        });
      }
    }
  };

  return (
    <div className="new-product-container">
      <div className="new-product-title">New Product</div>
      <div className="new-product-form">
        <label>
          Nombre:
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleInputChange}
            data-testid="input-name"
          />
          <p data-testid="error-name">{errors.name}</p>
        </label>

        <label>
          Precio:
          <input
            type="number"
            name="price"
            value={values.price}
            onChange={handleInputChange}
            data-testid="input-price"
          />
          <p data-testid="error-price">{errors.price}</p>
        </label>

        <label>
          Cantidad:
          <input
            type="number"
            name="amount"
            value={values.amount}
            onChange={handleInputChange}
            data-testid="input-amount"
          />
          <p data-testid="error-amount">{errors.amount}</p>
        </label>

        <button
          onClick={handleSubmit}
          className="form-button"
          data-testid="button-save"
        >
          Guardar Producto
        </button>
      </div>
      <p className="link-to-home" data-testid="link-to-home">
        <Link to="/">Volver a la pagina de productos</Link>
      </p>
    </div>
  );
}

export default NewProductForm;
