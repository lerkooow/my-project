import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../../features/store";
import LoginForm from "../LoginForm";
import userEvent from "@testing-library/user-event";

const MockLoginForm = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <LoginForm />
            </BrowserRouter>
        </Provider>
    )
};

describe("LoginForm", () => {

    it("should render login form if the user is not authorized", async () => {
        store.dispatch({ type: 'user/setUserId', payload: 'no user' });
        render(<MockLoginForm />);
        expect(screen.getByLabelText("username")).toBeInTheDocument();
        expect(screen.getByLabelText("password")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Log In" })).toBeInTheDocument();
    });

    it("render modal window when input fields are empty", async () => {
        store.dispatch({ type: 'user/setUserId', payload: 'no user' });
        render(<MockLoginForm />);
        expect(screen.queryByText("Incorrect input")).not.toBeInTheDocument();
        const buttonElement = screen.getByRole("button", { name: "Log In" });
        await userEvent.click(buttonElement);
        expect(screen.getByText("Incorrect input")).toBeInTheDocument();
    });

    it("data entry works correctly", async () => {
        store.dispatch({ type: 'user/setUserId', payload: 'no user' });
        render(<MockLoginForm />);
        const usernameInput = screen.getByLabelText('username');
        usernameInput.value = 'johnd';
        const passwordInput = screen.getByLabelText('password');
        passwordInput.value = '123456';
        expect(screen.getByDisplayValue('johnd'));
        expect(screen.getByDisplayValue('123456'));
    });

    it("failed account login", async () => {
        store.dispatch({ type: 'user/setUserId', payload: 'no user' });
        render(<MockLoginForm />);

        const usernameInput = screen.getByLabelText('username');
        userEvent.type(usernameInput, 'johnd');

        const passwordInput = screen.getByLabelText('password');
        userEvent.type(passwordInput, '12345');

        const buttonElement = screen.getByRole("button", { name: "Log In" });
        await userEvent.click(buttonElement);

        expect(screen.getByText("Incorrect input")).toBeInTheDocument();
    });

    it("successful account login", async () => {
        store.dispatch({ type: 'user/setUserId', payload: '1' });
        render(<MockLoginForm />);
        const buttonElement = screen.getByRole("button", { name: /log in/i });
        await userEvent.click(buttonElement);
        expect(window.location.pathname).toBe("/");
    });
});