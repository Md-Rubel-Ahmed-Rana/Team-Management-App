"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const envConfig_1 = require("./envConfig");
class DB {
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("MongoDB database connecting...");
                yield mongoose_1.default.connect(envConfig_1.config.db.url);
                // set logger to log db connection info
                console.log("Database connected successfully!");
            }
            catch (error) {
                // set logger to log db connection info
                console.log({
                    message: "Database was not connected!",
                    error: error === null || error === void 0 ? void 0 : error.message,
                });
            }
        });
    }
}
mongoose_1.default.connection.on("reconnected", () => {
    console.log("MongoDb has reconnected");
});
mongoose_1.default.connection.on("error", (error) => {
    console.log("MongoDB connection error", error);
    mongoose_1.default.disconnect();
});
mongoose_1.default.connection.on("disconnected", () => {
    console.log("MongoDB is disconnected");
});
exports.Database = new DB();
