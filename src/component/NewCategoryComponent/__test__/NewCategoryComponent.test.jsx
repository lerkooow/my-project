/* eslint-disable react/prop-types */
import { render, screen, fireEvent } from "@testing-library/react";
import NewCategoryComponent from "../NewCategoryComponent"
import { BrowserRouter, Link } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../../features/store";

const MockNewCategoryComponent = ({ category }) => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <NewCategoryComponent category={category} />
            </BrowserRouter>
        </Provider>
    )
};

const categories = ["electronics", "jewelery"];

describe("NewCategoryComponent", async () => {
    it("should render a title new categories electronics and men's", async () => {
        categories.map((category) => {
            render(<MockNewCategoryComponent category={category} />);
        })
        const newCategoryElectronics = screen.getByText(/new electronics/i);
        expect(newCategoryElectronics).toBeInTheDocument();
        const newCategoryMens = screen.getByText(/new jewelery/i);
        expect(newCategoryMens).toBeInTheDocument();
    });

    it("should render a image new category", async () => {
        render(<MockNewCategoryComponent category="electronics" />);
        const newCategoryImage = await screen.findAllByTestId("new-image");
        expect(newCategoryImage[0]).toHaveStyle("background-image: url(https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg)");
    });

    it("should render a circular progress", async () => {
        categories.map((category) => {
            render(<MockNewCategoryComponent category={category} />);
        })
        const circularElements = screen.getAllByTestId(/circular/i);
        expect(circularElements.length).toBe(2);
    });

    it("should render a new categories electronics", async () => {
        categories.map((category) => {
            render(<MockNewCategoryComponent category={category} />);
        })
        const categoriesElementElectronics = await screen.findAllByTestId(/electronics/i);
        expect(categoriesElementElectronics.length).toBe(4);
    });

    it("should render a new categories jewelery", async () => {
        categories.map((category) => {
            render(<MockNewCategoryComponent category={category} />);
        })
        const categoriesElementJewelery = await screen.findAllByTestId(/jewelery/i);
        expect(categoriesElementJewelery.length).toBe(4);
    });

    it("should render a button", async () => {
        categories.map((category) => {
            render(<MockNewCategoryComponent category={category} />);
        })
        const seeMoreButton = screen.getAllByText(/see more/i);
        expect(seeMoreButton.length).toBe(2);
    });

    it("should navigate to the correct category page when 'See more' button is clicked", async () => {
        categories.forEach((category, index) => {
            const { getAllByText } = render(
                <BrowserRouter>
                    <Link to={`/${category}`}>See more</Link>
                </BrowserRouter>
            );
            const seeMoreButtons = getAllByText("See more");
            const seeMoreButton = seeMoreButtons[index];
            fireEvent.click(seeMoreButton);
            expect(window.location.pathname).toBe(`/${category}`);
        });
    });

    it("should navigate to the correct category page when title product category electronics is clicked", async () => {
        render(<MockNewCategoryComponent category="electronics" />);
        const titleElement1 = await screen.findByText("WD 2TB Elements Portable External Hard Drive - USB 3.0");
        fireEvent.click(titleElement1);
        expect(window.location.pathname).toBe(`/electronics/1`);
    });

    it("should navigate to the correct category page when title product category jewelery is clicked", async () => {
        render(<MockNewCategoryComponent category="jewelery" />);
        const titleElement = await screen.findByText("John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet");
        fireEvent.click(titleElement);
        expect(window.location.pathname).toBe(`/jewelery/1`);
    });

});

