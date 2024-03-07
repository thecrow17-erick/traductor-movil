import axios from 'axios'

export const traslateApi = axios.create({
  baseURL: "https://text-translator2.p.rapidapi.com/",
  headers:{
    'X-RapidAPI-Key': 'ea484f968dmsh5fa24cd59a1dceep194baajsnf6900098ffb6',
    'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
  }
})