import {toast} from 'react-toastify';
import { sleep } from './sleep';

export const sendToastMessage = async (success, error) => {
        
   
    await toast.promise(
        sleep,
        {
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