import axios from "axios"
import IRateQuote from "../interfaces/IRateQuote";
import IUser from "../interfaces/IUser";
import IUserQuote from "../interfaces/IUserQuote";

const URL = process.env.SERVER_ENDPOINT || 'http://localhost:3001';

const APIService = {
    async postRegister (user: IUser) {
        const response = await axios.post(`${URL}/register`, user)
        return response
    },

    async postLogin (user: IUser) {
        const response = await axios.post(`${URL}/login`, user)
        return response
    },

    async postCreateQuote (quote: IUserQuote) {
        const response = await axios.post(`${URL}/createQuote`, quote)
        return response
    },

    async getMyQuotes (id: string) {
        const response = await axios.get(`${URL}/getAllUserQuotes/${id}`)
        return response
    },

    async getAllQuotes (id: string) {
        const response = await axios.get(`${URL}/getAllQuotes/${id}`)
        return response
    },

    async rateQuote (rating: IRateQuote) {
        const response = await axios.post(`${URL}/rateQuote`, rating)
        return response
    },

    async getTop5 () {
        const response = await axios.get(`${URL}/getTop5`)
        return response
    },

    async deleteQuote (quoteID: string) {
        const response = await axios.delete(`${URL}/deleteQuote/${quoteID}`)
        return response
    },
}

export default APIService