const errorRes = (message) => {
    const errorJson = {
        "error": message
    }
    return errorJson;
}

module.exports = errorRes;