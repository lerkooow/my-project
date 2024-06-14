import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../../features/store";
import Cart from "../Cart";
import userEvent from "@testing-library/user-event";
import { addToCart } from "../../../features/cart/cartSlice";

const MockCart = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Cart />
            </BrowserRouter>
        </Provider>
    )
};

describe("Cart", () => {
    it("renders cart", async () => {
        store.dispatch(addToCart({ productId: 1, quantity: 1 }));
        render(<MockCart />);

        expect(await screen.findByText(/Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops/i)).toBeInTheDocument();
        expect(screen.getAllByText(/£\d+\.\d{2}/)[0]).toBeInTheDocument();
        const subtotal = await screen.findAllByText(/109.95/i);
        expect(subtotal[1]).toBeInTheDocument();
    });

    it("updates quantity", async () => {
        render(<MockCart />);

        const buttonPlusElement = screen.getByRole("button", { name: "+" });
        expect(screen.getByText("1")).toBeInTheDocument();

        await userEvent.click(buttonPlusElement);
        expect(screen.getByText("2")).toBeInTheDocument();

        const buttonMinusElement = screen.getByRole("button", { name: "-" });
        await userEvent.click(buttonMinusElement);

        expect(screen.getByText("1")).toBeInTheDocument();
    });

    it("should render quantity minus 1 if the quantity 1", async () => {
        render(<MockCart />);
        const buttonMinusElement = await screen.findByRole("button", { name: "-" });
        expect(screen.getByText("1")).toBeInTheDocument();
        expect(buttonMinusElement).toHaveAttribute('disabled');
    });

    it("adding the same item to cart", async () => {
        store.dispatch(addToCart({ productId: 1, quantity: 2 }));
        render(<MockCart />);
        expect(screen.getByText("3")).toBeInTheDocument();
        expect
    });

    it("click on product link", async () => {
        render(<MockCart />);
        const titleElement = await screen.findByText(/Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops/i);
        await userEvent.click(titleElement);
        expect(window.location.pathname).toBe("/men's%20clothing/1");
    });

    it("adding the same item to cart", async () => {
        render(<MockCart />);
        const deleteButton = screen.getByTestId("delete")
        await userEvent.click(deleteButton);
        expect(screen.queryByText("Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops")).not.toBeInTheDocument();
    });

});