import axios from "axios"
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
}

export default APIService