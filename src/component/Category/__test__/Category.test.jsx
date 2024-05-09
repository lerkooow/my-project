import { render, screen } from "@testing-library/react";
import Category from "../Category";
import { BrowserRouter, Link } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../../features/store";
import userEvent from "@testing-library/user-event";

const MockCategory = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Category />
            </BrowserRouter>
        </Provider>
    )
};

describe("Category", async () => {
    it("should render categories", async () => {
        render(<MockCategory />);
        const categoriesElement = await screen.findAllByTestId(/category/i);
        expect(categoriesElement.length).toBe(4);
        expect(screen.getByText(/all products/i)).toBeInTheDocument();
    });

    it("should navigate to the correct category page when clicked", async () => {
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
