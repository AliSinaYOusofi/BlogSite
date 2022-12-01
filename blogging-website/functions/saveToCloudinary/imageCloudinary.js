import axios from "axios";

const saveImageReturnSecurURL = async (image) => {
    
    try {
        const imageFile = new FormData();
        imageFile.append("image", image);
        imageFile.append("preset_url", "xvmh6gbo");

        const response = await axios.post("https://api.cloudinary.com/v1_1/dudhf0avt/image/upload", imageFile);
    }catch(error) { console.log(error);}
}
// making