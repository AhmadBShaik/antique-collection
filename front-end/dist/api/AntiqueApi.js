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
class AntiqueApi {
    getAllAntiques() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield fetch('http://localhost:3000/all-antiques')
                .then(res => res.json());
            return result;
        });
    }
    getSingleAntique(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield fetch(`http://localhost:3000/antique-detail/${id}`)
                .then(res => res.json());
            return result;
        });
    }
    updateAntique(id, name, description, worth) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield fetch(`http://localhost:3000/edit-antique/${id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, description, worth }),
            });
            return result;
        });
    }
    deleteAntique(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield fetch(`http://localhost:3000/delete-antique/${id}`, {
                method: 'DELETE'
            });
            return result;
        });
    }
    createAntique(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield fetch("http://localhost:3000/create-antique", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            });
            return result;
        });
    }
}
