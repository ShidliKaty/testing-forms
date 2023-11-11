import { describe, it, vi } from "vitest";
import {StateForm as Form} from "./StateForm"
import { render } from "@testing-library/react";

describe("Form component", () => {
    it("should call onSubmit when the form is validwith the correct data", () => {
        const onSubmit = vi.fn()
        render(<Form onSubmit={onSubmit}/>)
    })
})