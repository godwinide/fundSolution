const path = require('path');

module.exports = app => {
    app.use("/customers", require("./routes/api/customers"));
    app.use("/deposit", require("./routes/api/deposit"));
    app.use("/withdraw", require("./routes/api/withdraw"));
    app.use("/history", require("./routes/api/history"));
    app.use("/commission", require("./routes/api/commission"));

    app.use("/admin", require("./routes/api/admin"));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });

};