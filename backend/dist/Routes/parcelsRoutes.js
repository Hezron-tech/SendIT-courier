"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const parcels_1 = require("../Controllers/parcels");
const routers = (0, express_1.Router)();
routers.post('/new', parcels_1.insertParcel);
exports.default = routers;
