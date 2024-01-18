import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import ProductCard from "../components/ProductCard";

describe("ProductCard component", () => {
  it("renders product information", () => {
    const product = { name: "Test Product", price: 10, amount: 5 };

    render(<ProductCard product={product} showButtons={true} />);

    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(screen.getByText(`$${product.price}`)).toBeInTheDocument();
    expect(screen.getByText(`Stock: ${product.amount}`)).toBeInTheDocument();
    expect(screen.getByText("Agregar al carrito")).toBeInTheDocument();
    expect(screen.getByTestId("card-button-inc")).toBeInTheDocument();
    expect(screen.getByTestId("card-button-dec")).toBeInTheDocument();
  });

  it("increments and decrements quantity", async () => {
    const user = userEvent.setup();
    const product = { name: "Test Product", price: 10, amount: 5 };

    render(<ProductCard product={product} showButtons={true} />);

    const incrementButton = screen.getByTestId("card-button-inc");
    const decrementButton = screen.getByTestId("card-button-dec");
    const quantityDisplay = screen.getByTestId("card-button-quantity");

    expect(quantityDisplay.textContent).toBe("1");

    await user.click(incrementButton);

    expect(quantityDisplay.textContent).toBe("2");

    await user.click(decrementButton);

    expect(quantityDisplay.textContent).toBe("1");
  });

  it("hide increment, decrement and add to cart buttons", async () => {
    const product = { name: "Test Product", price: 10, amount: 5 };
    const incrementButton = screen.queryByTestId("card-button-inc");
    const decrementButton = screen.queryByTestId("card-button-dec");
    const addToCartButton = screen.queryByTestId("add-to-cart-button");

    render(<ProductCard product={product} showButtons={false} />);

    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(screen.getByText(`$${product.price}`)).toBeInTheDocument();
    expect(screen.getByText(`Cant.: ${product.amount}`)).toBeInTheDocument();
    expect(incrementButton).toBeNull();
    expect(decrementButton).toBeNull();
    expect(addToCartButton).toBeNull();
  });
});
