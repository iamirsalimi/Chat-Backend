const express = require("express");
const path = require("path");
const cors = require("cors");
const NamespaceRouter = require("./routes/Namespace");
const UserRouter = require("./routes/User.routes");

const app = express();

//* BodyParser
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));

//* CORS Policy
app.use(cors());

//* Template Engine

//* Static Folder
app.use(express.static(path.join(__dirname, "public")));

//* Routes
app.use("/api/namespaces", NamespaceRouter);
app.use("/api/auth", UserRouter);

//* 404 Error handler

module.exports = app;
