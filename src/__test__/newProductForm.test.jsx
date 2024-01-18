import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import NewProductForm from "../components/NewProductForm";

describe("NewProductForm component", () => {
  it("renders NewProductForm component", async () => {
    render(
      <BrowserRouter>
        <NewProductForm />
      </BrowserRouter>
    );

    // Check if the initial state is rendered correctly
    const nameInput = screen.getByTestId("input-name");
    const nameLabel = screen.getByText(/Nombre:/i);
    expect(nameLabel).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();

    const priceInput = screen.getByTestId("input-price");
    const priceLabel = screen.getByText(/Precio:/i);
    expect(priceLabel).toBeInTheDocument();
    expect(priceInput).toBeInTheDocument();

    const amountInput = screen.getByTestId("input-amount");
    const amountLabel = screen.getByText(/Cantidad:/i);
    expect(amountLabel).toBeInTheDocument();
    expect(amountInput).toBeInTheDocument();

    const saveButton = screen.getByTestId("button-save");
    expect(saveButton).toBeInTheDocument();

    const linkHome = screen.getByTestId("link-to-home");
    expect(linkHome).toBeInTheDocument();
  });

  it("handles form submission with validation", async () => {
    const user = userEvent.setup();

    render(
      <BrowserRouter>
        <NewProductForm />
      </BrowserRouter>
    );

    // Fill in the form
    fireEvent.input(screen.getByTestId("input-name"), {
      target: { value: "Product Test" },
    });
    fireEvent.input(screen.getByTestId("input-price"), {
      target: { value: "1000" },
    });
    fireEvent.input(screen.getByTestId("input-amount"), {
      target: { value: "5" },
    });

    // Submit the form
    await user.click(screen.getByTestId("button-save"));

    // Check if the success message is displayed
    const successMessage = await screen.findByText(
      /Desea agregar un nuevo producto?/i
    );
    expect(successMessage).toBeInTheDocument();
  });

  it("handles empty form submission with validation errors", async () => {
    const user = userEvent.setup();

    render(
      <BrowserRouter>
        <NewProductForm />
      </BrowserRouter>
    );

    // Submit the form
    await user.click(screen.getByTestId("button-save"));

    // Check if the errors message are displayed
    const nameError = screen.getByTestId("error-name");
    const priceError = screen.getByTestId("error-price");
    const amountError = screen.getByTestId("error-amount");

    expect(nameError).toHaveTextContent(/El nombre no puede estar vacio/i);
    expect(priceError).toHaveTextContent(/El precio no puede estar vacio/i);
    expect(amountError).toHaveTextContent(/La cantidad no puede estar vacia/i);
  });

  it("handles form submission with price 0 and amount 0", async () => {
    const user = userEvent.setup();

    render(
      <BrowserRouter>
        <NewProductForm />
      </BrowserRouter>
    );

    // Fill in the form
    fireEvent.input(screen.getByTestId("input-name"), {
      target: { value: "Product Test" },
    });
    fireEvent.input(screen.getByTestId("input-price"), {
      target: { value: "0" },
    });
    fireEvent.input(screen.getByTestId("input-amount"), {
      target: { value: "0" },
    });

    // Submit the form
    await user.click(screen.getByTestId("button-save"));

    // Check if the errors message are displayed
    const priceError = screen.getByTestId("error-price");
    expect(priceError).toHaveTextContent(/El precio no puede ser 0/i);
    const amountError = screen.getByTestId("error-amount");
    expect(amountError).toHaveTextContent(/La cantidad no puede ser 0/i);
  });

  it("handles form submission with not an integer amount", async () => {
    const user = userEvent.setup();

    render(
      <BrowserRouter>
        <NewProductForm />
      </BrowserRouter>
    );

    // Fill in the form
    fireEvent.input(screen.getByTestId("input-name"), {
      target: { value: "Product Test" },
    });
    fireEvent.input(screen.getByTestId("input-price"), {
      target: { value: "1000" },
    });
    fireEvent.input(screen.getByTestId("input-amount"), {
      target: { value: "2.5" },
    });

    // Submit the form
    await user.click(screen.getByTestId("button-save"));

    // Check if the errors message are displayed
    const amountError = screen.getByTestId("error-amount");
    expect(amountError).toHaveTextContent(
      /La cantidad tiene que ser un número entero/i
    );
  });
});

// Add more tests as needed, for example, test for form validation, error messages, etc.
