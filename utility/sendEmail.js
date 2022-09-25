const nodemailer = require("nodemailer");
const dotenv = require("dotenv").config();

const sendEmail = async (to,data = {}) => {
    console.log(data.token);
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
    const mailOptions = {
			from: `Verification <trustcodernet@gmail.com>`, // sender address
			to: to, // list of receivers
			subject: "Verify Your Email", // Subject line
			html: `
             <!DOCTYPE html>
				<html lang="en">
		<head>
			<meta charset="UTF-8" />
			<meta http-equiv="X-UA-Compatible" content="IE=edge" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<title>Verification Email</title>
			<style>
				.main-wrapper {
					background-color: #ddd;
					height: 100vh;
					width: 100%;
					margin: 0;
					padding: 0;
					text-align: center;
					display: flex;
					justify-content: center;
					align-items: center;
				}
				.wrapper {
					background: #fff;
					padding: 50px;
					box-shadow: 1px 1px 8px 9px #ddd;
				}

				a.btn.btn-button {
					background: hsl(206deg 100% 73%);
					color: #fff;
					display: inline-block;
					text-decoration: none;
					padding: 10px 30px;
					font-size: 20px;
					box-shadow: 2px 10px 10px 0px #ddd;
				}
			</style>
		</head>
		<body>
			<div class="main-wrapper">
				<div class="wrapper">
					<div class="header">
						<h1>Verification your Email</h1>
					</div>
					<div class="body">
						<h2>Dear ${data.name} ! please Verification your email</h2>
						<a class="btn btn-button" href="http://localhost:4545/student/verify/${data.token}">Verify Now</a>
					</div>
				</div>
			</div>
		</body>
	</html>`, // plain text bodyparserrawoptions
		};
 await transporter.sendMail( mailOptions, function (err, info) {
        if (err) console.log(err);
        else console.log(info);
    });
}

module.exports = sendEmail;