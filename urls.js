module.exports = app => {
    app.use("/api/customers", require("./routes/api/customers"));
    app.use("/api/deposit", require("./routes/api/deposit"));
    app.use("/api/withdraw", require("./routes/api/withdraw"));
    app.use("/api/history", require("./routes/api/history"));
    app.use("/api/commission", require("./routes/api/commission"));

    app.use("/api/admin", require("./routes/api/admin"));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });

};