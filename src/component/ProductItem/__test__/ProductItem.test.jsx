/* eslint-disable react/prop-types */
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../../features/store";
import ProductItem from "../ProductItem";
import userEvent from "@testing-library/user-event";

const MockProductItem = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <ProductItem />
            </BrowserRouter>
        </Provider>
    )
};

describe("ProductItem", () => {
    it("should render item product information", async () => {
        render(<MockProductItem />);
        const imageElement = await screen.findByTestId("image-item");
        expect(imageElement).toHaveStyle("background-image: url(https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg)");

        const ratingStarsElement = await screen.findByTestId("rating");
        expect(ratingStarsElement).toBeInTheDocument();

        const ratingElement = await screen.findByText("3.9");
        expect(ratingElement).toBeInTheDocument();

        const titleElement = await screen.findByTestId("title-item");
        expect(titleElement).toBeInTheDocument();

        const priceElement = await screen.findByText(/£109.95/i);
        expect(priceElement).toBeInTheDocument();

        const descriptionElement = await screen.findByTestId(/description/i);
        expect(descriptionElement).toBeInTheDocument();
    });

    it("should render button ADD TO CART", async () => {
        render(<MockProductItem />);
        const buttonElement = await screen.findByRole("button", { name: /add to cart/i });
        expect(buttonElement).toBeInTheDocument();
    });

    it("should render modal window if the user is not authorized", async () => {
        store.dispatch({ type: 'user/setUserId', payload: 'no user' });

        render(<MockProductItem />);
        const buttonElement = await screen.findByRole("button", { name: /add to cart/i });

        await userEvent.click(buttonElement);

        expect(screen.getByText("You are not authorized")).toBeInTheDocument();
    });

    it("should render modal window if the user is not authorized", async () => {
        store.dispatch({ type: 'user/setUserId', payload: 1 });

        render(<MockProductItem />);
        const buttonElement = await screen.findByRole("button", { name: /add to cart/i });

        await userEvent.click(buttonElement);

        expect(screen.getByText("Added to cart")).toBeInTheDocument();
    });

    it("should render quantity plus 1", async () => {
        render(<MockProductItem />);
        const buttonPlusElement = await screen.findByRole("button", { name: "+" });
        expect(screen.getByText("1")).toBeInTheDocument();
        await userEvent.click(buttonPlusElement);
        expect(screen.getByText("2")).toBeInTheDocument();
    });

    it("should render quantity minus 1 if the quantity not 1", async () => {
        render(<MockProductItem />);
        const buttonPlusElement = await screen.findByRole("button", { name: "+" });
        expect(screen.getByText("1")).toBeInTheDocument();
        await userEvent.click(buttonPlusElement);

        const buttonMinusElement = await screen.findByRole("button", { name: "-" });
        expect(screen.getByText("2")).toBeInTheDocument();
        await userEvent.click(buttonMinusElement);
        expect(screen.getByText("1")).toBeInTheDocument();
    });

    it("should render quantity minus 1 if the quantity 1", async () => {
        render(<MockProductItem />);
        const buttonMinusElement = await screen.findByRole("button", { name: "-" });
        expect(screen.getByText("1")).toBeInTheDocument();
        expect(buttonMinusElement).toHaveAttribute('disabled');
    });
});
