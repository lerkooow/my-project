import { render, screen } from "@testing-library/react";
import Footer from "../Footer";
import { BrowserRouter, Link } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../../features/store";
import userEvent from "@testing-library/user-event";

const MockFooter = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Footer />
            </BrowserRouter>
        </Provider>
    )
};

describe("Footer", async () => {
    it("should render a footer categories", async () => {
        render(<MockFooter />);
        const categoriesFooterElement = await screen.findAllByTestId(/footer/i);
        expect(categoriesFooterElement.length).toBe(4);
        expect(screen.getByText(/all products/i)).toBeInTheDocument();
    })

    it("should navigate to the correct category page when is clicked", async () => {
        render(
            <BrowserRouter>
                <Link to="/electronics">Electronics</Link>
            </BrowserRouter>
        );
        const pageCategory = screen.getByText(/electronics/i);
        await userEvent.click(pageCategory);
        expect(window.location.pathname).toBe("/electronics");
    });
});
