"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const anime_1 = __importDefault(require("./anime"));
const character_1 = __importDefault(require("./character"));
const club_1 = __importDefault(require("./club"));
const genre_1 = __importDefault(require("./genre"));
const magazine_1 = __importDefault(require("./magazine"));
const manga_1 = __importDefault(require("./manga"));
const meta_1 = __importDefault(require("./meta"));
const person_1 = __importDefault(require("./person"));
const producer_1 = __importDefault(require("./producer"));
const schedule_1 = __importDefault(require("./schedule"));
const search_1 = __importDefault(require("./search"));
const season_1 = __importDefault(require("./season"));
const top_1 = __importDefault(require("./top"));
const user_1 = __importDefault(require("./user"));
exports.default = {
    Anime: anime_1.default,
    Character: character_1.default,
    Club: club_1.default,
    Genre: genre_1.default,
    Magazine: magazine_1.default,
    Manga: manga_1.default,
    Meta: meta_1.default,
    Person: person_1.default,
    Producer: producer_1.default,
    Schedule: schedule_1.default,
    Search: search_1.default,
    Season: season_1.default,
    Top: top_1.default,
    User: user_1.default
};
