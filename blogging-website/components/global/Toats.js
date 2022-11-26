import {toast} from 'react-toastify';
import { sleep } from './sleep';

export const sendToastMessage = async (pending, success, error) => {
        
   
    await toast.promise(
        sleep,
        {
            pending: {
            render() {
                return <h1>{pending} ... </h1>;
            },
            },
            success: {
            render() {
                return <h1>{success}</h1>;
            },
            },
            error: {
            render() {
                return <h1>{error}</h1>;
            },
            },
        }
    );

}