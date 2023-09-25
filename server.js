const express = require("express");
const app = express();
const port = 8081;
const cors = require("cors");
const mysql = require("mysql");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "cinema",
});

app.get("/:title", (req, res) => {
    const { title } = req.params;
    const sql = `SELECT * FROM ${title}`;

    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.get("/users", (req, res) => {
    const sql = `SELECT * FROM users`;

    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.post("/users", (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const sql = `INSERT INTO users (first_name, last_name, user_email, user_password ) VALUES (?, ?, ?, ?)`;

    db.query(sql, [firstName, lastName, email, password], (err, result) => {
        if (err) {
            console.error("Error", err);
            return res.json({ success: false, message: "Error" });
        } else {
            return res.json({
                success: true,
                message: "The user has been added successfully",
            });
        }
    });
});

app.put("/:title/update", (req, res) => {
    const { selectedSeats } = req.body;
    const { title } = req.params;

    const updatePromises = selectedSeats.map((seat) => {
        const { row, number } = seat;
        return new Promise((resolve, reject) => {
            const sql = `UPDATE ${title} SET is_booked = ? WHERE row_no = ? AND seat_no = ?`;
            db.query(sql, ["true", row, number], (err, result) => {
                if (err) {
                    console.error("Error", err);
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    });

    Promise.all(updatePromises)
        .then(() => {
            return res.json({
                success: true,
                message: "Records have been updated successfully.",
            });
        })
        .catch((err) => {
            return res.json({ success: false, message: "Error" });
        });
});

app.put("/:title/cancel", (req, res) => {
    const { title } = req.params;
    const sql = `UPDATE ${title} SET is_booked = ?`;

    db.query(sql, ["false"], (err, result) => {
        if (err) {
            console.error("Error", err);
            return res.json({ success: false, message: "Error" });
        } else {
            return res.json({
                success: true,
                message: "All bookings have been cleared successfully.",
            });
        }
    });
});

app.post("/orders", (req, res) => {
    const { formattedTitle, id, purchaseTime, purchaseDate, orderDescription, totalPrice } =
        req.body;

    const sql = `INSERT INTO orders (movie_title, order_description, order_id, order_price, purchase_time, purchase_date) VALUES (?, ?, ?, ?, ?, ?)`;

    db.query(
        sql,
        [formattedTitle, orderDescription, id, totalPrice, purchaseTime, purchaseDate],
        (err, result) => {
            if (err) {
                console.error("Error", err);
                return res.json({ success: false, message: "Error" });
            } else {
                return res.json({
                    success: true,
                    message: "The order has been made successfully",
                });
            }
        }
    );
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
    console.log(`http://localhost:${port}`);
});
