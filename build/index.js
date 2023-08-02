"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var emails_1 = require("@msalek/emails");
var cors_1 = tslib_1.__importDefault(require("cors"));
var dotenv = tslib_1.__importStar(require("dotenv"));
var express_1 = tslib_1.__importDefault(require("express"));
var helmet_1 = tslib_1.__importDefault(require("helmet"));
dotenv.config();
if (!process.env.PORT ||
    !process.env.SENDGRID_API_KEY ||
    !process.env.CORS_WHITELIST ||
    !process.env.VERIFIED_SENDER) {
    console.error('Missing necessary env variables.');
    process.exit(1);
}
var PORT = parseInt(process.env.PORT, 10);
var app = (0, express_1.default)();
// const corsWhitelistArray: string[] = process.env.CORS_WHITELIST.split(',')
app.use((0, cors_1.default)({
    origin: '*',
    'optionsSuccessStatus': 200
}));
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.listen(PORT, function () {
    console.log("Listening on port ".concat(PORT));
});
(0, emails_1.setApiKey)(process.env.SENDGRID_API_KEY);
app.post('/send', function (_a, res) {
    var body = _a.body;
    return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var errorText, message;
        return tslib_1.__generator(this, function (_b) {
            if (!(body === null || body === void 0 ? void 0 : body.subject) || !(body === null || body === void 0 ? void 0 : body.text)) {
                errorText = "Mail cannot be send. Missing subject: ".concat(typeof (body === null || body === void 0 ? void 0 : body.subject), " or text: ").concat(body === null || body === void 0 ? void 0 : body.text, "}");
                console.warn(errorText);
                res.status(400).send(errorText);
                return [2 /*return*/, void undefined];
            }
            message = tslib_1.__assign(tslib_1.__assign({}, body), { to: process.env.VERIFIED_SENDER });
            (0, emails_1.sendEmail)(message, process.env.VERIFIED_SENDER);
            res.status(200).send('OK');
            return [2 /*return*/];
        });
    });
});
