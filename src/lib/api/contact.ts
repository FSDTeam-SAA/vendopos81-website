import api from "./api";



export type ContactFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  message: string;
};

export async function sendContactForm(data: ContactFormData) {
  const res = await api.post("/contact/send-message", data);
  return res.data;
}


export async function getallCatagory() {
  const res = await api.get("/category/get-all");
  return res.data;
}
