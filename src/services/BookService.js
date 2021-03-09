import API from './api';

export default class BookService {

    static bookConsultation = (payload) =>
    {
       return API.post('/api/optimalvision/book/bookconsultation', payload);
    }

    static setDateTime = (bookingId, bookingDate, bookingTime) =>
    {
       return API.post(`/api/optimalvision/book/setdatetime?bookingId=${bookingId}`, {bookingDate, bookingTime});
    }



}