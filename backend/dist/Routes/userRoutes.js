"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("../Controllers/users");
const router = (0, express_1.Router)();
router.post('/register', users_1.insertUsers);
exports.default = router;
