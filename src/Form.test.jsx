import { describe, expect, it, vi } from "vitest";
import {StateForm as Form} from "./StateForm"
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Form component", () => {
    it("should call onSubmit when the form is validwith the correct data", async () => {
        const onSubmit = vi.fn()
        const user = userEvent.setup()
        render(<Form onSubmit={onSubmit}/>)
        const email = "test@webdevsimplified.com"
        const password = "Password123"

        await user.type(screen.getByLabelText("Email"), email)
        await user.type(screen.getByLabelText("Password"), password)
        await user.click(screen.getByText("Submit"))

        expect(screen.queryByTestId("email-error-msg")).not.toBeInTheDocument()
        expect(screen.queryByTestId("password-error-msg")).not.toBeInTheDocument()

        expect(onSubmit).toHaveBeenCalledOnce()
        expect(onSubmit).toHaveBeenCalledWith({email, password})
    })

    it("should show the error message when the email is invalid", async() => {
        const onSubmit = vi.fn()
        const user = userEvent.setup()
        render(<Form onSubmit={onSubmit}/>)
        const email = "test@test.com"
        const password = "Password123"
        
        await user.type(screen.getByLabelText("Email"), email)
        await user.type(screen.getByLabelText("Password"), password)
        await user.click(screen.getByText("Submit"))

        expect(screen.getByTestId("email-error-msg")).toBeInTheDocument()

        expect(onSubmit).not.toHaveBeenCalledOnce()
    })

    it("should show the error message when the password is invalid", async() => {
        const onSubmit = vi.fn()
        const user = userEvent.setup()
        render(<Form onSubmit={onSubmit}/>)
        const email = "test@webdevsimplified.com"
        const password = "123"
        
        await user.type(screen.getByLabelText("Email"), email)
        await user.type(screen.getByLabelText("Password"), password)
        await user.click(screen.getByText("Submit"))

        expect(screen.getByTestId("password-error-msg")).toBeInTheDocument()

        expect(onSubmit).not.toHaveBeenCalledOnce()
    })
})