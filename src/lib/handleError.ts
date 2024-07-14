import { PrismaClientKnownRequestError, PrismaClientValidationError } from "@prisma/client/runtime/library";

export function handlerError(error: unknown) {
    const response = {
        success: false,
        data: null,
        message: ""
    }
    if (error instanceof PrismaClientKnownRequestError) {
        switch (error.code) {
            case "P2002":
                response.message = "already exists"
                return response
            case "P2025":
                response.message = "not found"
                return response
            default:
                response.message = "an error occurred"
                return response
        }
    }

    if (error instanceof PrismaClientValidationError) {
        response.message = "validation failed."
        return response
    }

    response.message = "internal server error"
    return response
}