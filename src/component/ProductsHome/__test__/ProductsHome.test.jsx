import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../../features/store";
import ProductsHome from "../ProductsHome";
import userEvent from "@testing-library/user-event";

const MockProductsHome = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <ProductsHome />
            </BrowserRouter>
        </Provider>
    );
};

describe("ProductsHome", () => {
    it("render products", async () => {
        render(<MockProductsHome />);
        expect(await screen.findByText("WD 2TB Elements Portable External Hard Drive - USB 3.0")).toBeInTheDocument();
        expect(await screen.findByText("£64")).toBeInTheDocument();
    });

    it("value radio button", async () => {
        render(<MockProductsHome />);
        const radioElementDesc = await screen.findByLabelText("Descending");
        expect(radioElementDesc.value).toBe("desc");
        const radioElementAsc = await screen.findByLabelText("Ascending");
        expect(radioElementAsc.value).toBe("asc");
    })

    it("should render more products if click button 'See more'", async () => {
        render(<MockProductsHome />);
        const limitElement4 = screen.getByText(/Products: 1 - 4/i);
        expect(limitElement4).toBeInTheDocument();
        const buttonElement = await screen.findByRole("button", { name: "See more" });
        await userEvent.click(buttonElement);
        const limitElement8 = screen.getByText(/Products: 1 - 8/i);
        expect(limitElement8).toBeInTheDocument();
    });

    it("navigation to the product card if you click on the title", async () => {
        render(<MockProductsHome />);
        const titleElement = await screen.findByText("WD 2TB Elements Portable External Hard Drive - USB 3.0");
        await userEvent.click(titleElement);
        expect(window.location.pathname).toBe(`/electronics/1`);
    });
});
