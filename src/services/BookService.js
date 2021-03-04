import API from './api';

export default class BookService {

    static bookConsultation = (payload) =>
    {
       return API.post('/api/optimalvision/book/bookconsultation', payload);
    }


}