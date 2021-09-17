import {render, screen} from "@testing-library/react";
import React from "react";
import {App} from "../App";

describe("App", () => {
    it("display hello world", () => {
        render(<App/>);
        expect(screen.getByText("Hello Vite + React!")).toBeInTheDocument();
    })
});