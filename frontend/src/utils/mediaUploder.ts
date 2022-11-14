
export const mediaUploader = async (file: File) => {
    const media = [];
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "khoiqs1g");
  formData.append("cloud_name", "dgc5asdwu");
  formData.append("api_key", "148733824216685");
  formData.append("timestamp", `${Date.now()}`)
    for (const forms of formData.entries()) { 
        console.log(forms[0], " - ", forms[1]);
    }
  try {
      fetch("https://api.cloudinary.com/v1_1/dgc5asdwu/image/upload", {
          method: "POST",
          body: formData,
      }).then(res => res.json()).then(result => {
          console.log(result); 
          media.push(result.secure_url);
      }).catch(err => console.log(err))

  } catch (err: any) {
    console.log(err);
    }
    
};
