class DbResponse {
    static handleInsertionResponse(err) {
        if(err) {
            console.error(err);
            return;
        }
        console.log("successfully inserted the data");
    }
}

module.exports = {
    DbResponse
};
