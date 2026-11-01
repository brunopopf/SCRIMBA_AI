import express from "express";
import cors from 'cors';
import { getCorsOptions } from "./corsOptions.js";

export const setupConfig = (app) =>{
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    console.log(getCorsOptions())
    app.use(cors(getCorsOptions()));
};