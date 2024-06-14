import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import HomeBanner from "../HomeBanner";
import store from "../../../features/store";

const MockHomeBanner = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <HomeBanner />
            </BrowserRouter>
        </Provider>
    )
};

describe("HomeBanner", async () => {
    it("should navigate to the women's clothing page", async () => {
        render(<MockHomeBanner />);
        const viewElements = screen.queryAllByText("View collection");

        fireEvent.click(viewElements[0]);
        expect(window.location.pathname).toBe("/women's%20clothing");

        fireEvent.click(viewElements[1]);
        expect(window.location.pathname).toBe("/women's%20clothing");
    });
});