import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../../features/store";
import UserAccount from "../UserAccount";
import userEvent from "@testing-library/user-event";

const MockUserAccount = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <UserAccount />
            </BrowserRouter>
        </Provider>
    )
};

describe("UserAccount", () => {
    it("should render info about user", async () => {
        store.dispatch({ type: 'user/setUserId', payload: '1' });
        render(<MockUserAccount />);
        expect(screen.getByText("User Account Details")).toBeInTheDocument();
        expect(await screen.findByText("john@gmail.com")).toBeInTheDocument();
        expect(await screen.findByText("johnd")).toBeInTheDocument();
        expect(await screen.findByText("john")).toBeInTheDocument();
        expect(await screen.findByText("doe")).toBeInTheDocument();
        expect(await screen.findByText("1-570-236-7033")).toBeInTheDocument();
    });

    it("should render button LOG OUT", async () => {
        store.dispatch({ type: 'user/setUserId', payload: '1' });
        render(<MockUserAccount />);
        const buttonElement = screen.getByRole("button", { name: /log out/i });
        await userEvent.click(buttonElement);
        expect(window.location.pathname).toBe("/");
    });

});