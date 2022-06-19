import axios from "axios";
export const sendEmail = async (to, subject, body) => {
  axios.post("http://michaelbelete.pythonanywhere.com/api/mail/", {subject: subject, to: to, body: body}).then(function (response) {
    console.log("sent email");
  }).catch(function (error) {
    console.log("error sending email");
  });
  
};
