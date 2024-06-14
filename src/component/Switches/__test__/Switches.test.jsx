import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../../features/store";
import Switches from "../Switches";

const MockSwitches = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Switches />
            </BrowserRouter>
        </Provider>
    );
};

describe("Switches", () => {
    it("should change theme when switching", () => {
        render(<MockSwitches />);

        const initialTheme = store.getState().user.switches;
        expect(initialTheme).toBe("light");

        const switchElementDark = screen.getByRole("combobox");
        fireEvent.change(switchElementDark, { target: { value: "dark" } });

        const changedThemeDark = store.getState().user.switches;
        expect(changedThemeDark).toBe("dark");

        const switchElementGrey = screen.getByRole("combobox");
        fireEvent.change(switchElementGrey, { target: { value: "grey" } });

        const changedThemeGrey = store.getState().user.switches;
        expect(changedThemeGrey).toBe("grey");
    });
});
