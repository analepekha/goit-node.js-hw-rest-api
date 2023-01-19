const { BASE_URL } = process.env;

const createVerifyEmail = (email, verificationToken) => {
  const mail = {
    to: email,
    subject: "Подтверждение регистрации на сайте",
    html: `<a href="${BASE_URL}/api/users/verify/${verificationToken}" target="_blank">Нажмите для подтверждении регистрации</a>`,
  };
  return mail;
};

module.exports = createVerifyEmail;
