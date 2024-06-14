import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../../features/store";
import UserCart from "../UserCart";
import userEvent from "@testing-library/user-event";

const MockUserAccount = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <UserCart />
            </BrowserRouter>
        </Provider>
    )
};

describe("UserCart", () => {
    it("should render required input username", async () => {
        store.dispatch({ type: 'user/setUserId', payload: 'no user' });
        render(<MockUserAccount />);
        expect(screen.queryByText('required')).not.toBeInTheDocument();
        const usernameInput = screen.getByLabelText('username');
        const boxElement = screen.getByTestId('box');
        await userEvent.click(usernameInput);
        await userEvent.click(boxElement);
        expect(screen.getByText('required')).toBeInTheDocument();
    });

    it("should render required input password", async () => {
        store.dispatch({ type: 'user/setUserId', payload: 'no user' });
        render(<MockUserAccount />);
        expect(screen.queryByText('required')).not.toBeInTheDocument();
        const passwordInput = screen.getByLabelText('password');
        const boxElement = screen.getByTestId('box');
        await userEvent.click(passwordInput);
        await userEvent.click(boxElement);
        expect(screen.getByText('required')).toBeInTheDocument();
    });
});