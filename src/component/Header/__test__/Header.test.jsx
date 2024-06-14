import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../../features/store";
import Header from "../Header";
import userEvent from "@testing-library/user-event";

const MockHeader = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        </Provider>
    )
};

describe("Header", () => {
    it("should navigate to the home page", async () => {
        render(<MockHeader />);
        const avionElement = screen.getByText(/avion/i);
        await userEvent.click(avionElement);
        expect(window.location.pathname).toBe("/");
    });

    it("should navigate to the cart page", async () => {
        render(<MockHeader />);
        const cartIconElement = screen.getByTestId(/cart/i);
        await userEvent.click(cartIconElement);
        expect(window.location.pathname).toBe("/cart");
    });

    it("should navigate to the user page if the user is not authorized", async () => {
        store.dispatch({ type: 'user/setUserId', payload: 'no user' });

        render(<MockHeader />);
        const avatarIconElement = screen.getByTestId(/avatar/i);
        await userEvent.click(avatarIconElement);
        expect(window.location.pathname).toBe("/user");
    });

    it("should navigate to the user page if the user is authorized", async () => {
        store.dispatch({ type: 'user/setUserId', payload: 1 });

        render(<MockHeader />);
        const usernameElement = screen.getByTestId(/username/i);
        await userEvent.click(usernameElement);
        const avatarIconElement = screen.queryByTestId(/avatar/i);
        expect(avatarIconElement).not.toBeInTheDocument();
        expect(window.location.pathname).toBe("/user");
    });

    it("should allow user select option", async () => {
        render(<MockHeader />);
        await userEvent.selectOptions(screen.getByRole("combobox"), "Dark");
        expect((screen.getByRole("option", { name: "Dark" })).selected).toBe(true);
    });
});
