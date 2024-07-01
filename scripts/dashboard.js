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
function getData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("https://example.org/products.json", {
                headers: { Authorization: "Bearer " + token },
            });
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const json = yield response.json();
            console.log(json);
        }
        catch (error) {
            console.error(error.message);
        }
    });
}
