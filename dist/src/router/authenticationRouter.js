"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_1 = require("../controllers/authentication");
const authenticationMiddleware_1 = require("../middlewares/authenticationMiddleware");
const router = (0, express_1.Router)();
router.post('/', authenticationMiddleware_1.validateBodyAuthentication, authentication_1.loginUser);
exports.default = router;
