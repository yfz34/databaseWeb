export function openSuccessSnackbar(msg) {
    return {
        type: "OPEN_SUCCESS_SNACKERBAR",
        payload: {
            data: msg
        }
    }
}

export function closeSuccessSnackbar() {
    return {
        type: "CLOSE_SUCCESS_SNACKERBAR"
    }
}

export function openFailSnackbar(msg) {
    return {
        type: "OPEN_FAIL_SNACKERBAR",
        payload: {
            data: msg
        }
    }
}

export function closeFailSnackbar() {
    return {
        type: "CLOSE_FAIL_SNACKERBAR",
    }
}