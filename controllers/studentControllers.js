// path required
const path = require('path');

// file system modiule required
const {readFileSync,writeFileSync} = require('fs');
// email and mobile otp funciton required
const emailSend = require('../utility/sendEmail');
const smsSend = require("../utility/sendSMS");


// all students controller 
const showAllStudentsController = (req,res) => {
	const students = JSON.parse(
		readFileSync(path.join(__dirname, "../db/students.json"))
	);

	const isvalid = students.filter((data) => data.isvalid == true);
    res.render("index", {
			students: isvalid,
		});
}

// add new students controller 
const showAdnewStudentController = (req,res) => {
    res.render('create');
}

// unverfiy students list controller
const showUnverifyStudentController = (req,res) => {
    const students = JSON.parse(readFileSync(path.join(__dirname, "../db/students.json")));
    const isvalid = students.filter((data) => data.isvalid == false);

    res.render("unverify", {
			students: isvalid,
		});
}

//  all students view controller
const showViewStudentController = (req,res) => {
	const students = JSON.parse(readFileSync(path.join(__dirname, "../db/students.json")));
	const id = req.params.id;
	const student = students.find(data => data.id == id);
    res.render("view", {
			id: student.id,
			name: student.name,
			email: student.email,
			phone: student.phone,
			department: student.department,
			photo: student.photo,

		});
}


//edit student
const showEditStudentController = (req, res) => {
	const students = JSON.parse(readFileSync(path.join(__dirname, "../db/students.json")));
	const id = req.params.id;
	const student = students.find((data) => data.id == id);
	res.render("edit", {
		id: student.id,
		name: student.name,
		email: student.email,
		phone: student.phone,
		department: student.department,
		photo: student.photo
	});

};

//  update student
const UpdatestudentListController = (req, res) => {
	const { id } = req.params;
	const students = JSON.parse(readFileSync(path.join(__dirname, "../db/students.json")));
	 	  students[students.findIndex((data) => data.id == id)] = {
				...students[students.findIndex((data) => data.id == id)],
				id: id,
				name: req.body.name,
				email: req.body.email,
				phone: req.body.phone,
				department: req.body.department,
				photo: req.files["photo"][0].filename,
			};
	
		 writeFileSync(
				path.join(__dirname, "../db/students.json"),
				JSON.stringify(students)
			);
			res.redirect("/");

};

//  delete students
const deleteStudentController = (req, res) =>{
	 const { id } = req.params;
	 const students = JSON.parse(readFileSync(path.join(__dirname, "../db/students.json")));
	 const NewStudents = students.filter((data) => data.id != id);
		writeFileSync(
			path.join(__dirname, "../db/students.json"),
			JSON.stringify(NewStudents)
		);
		res.redirect("/");
}

// dataase store
const storeStudentController = (req,res) => {
     const students = JSON.parse(readFileSync(path.join(__dirname, "../db/students.json")));
	 const { name, email, phone, department,ismobileverify,isemalverify,token } =req.body;
	 const otp = Math.floor(Math.random() *10000);
	 const tokens = Date.now() + '_'+ Math.floor(Math.random() * 100000);
		   students.push({
				id: Date.now(),
				name: name,
				email: email,
				phone: phone,
				department: department,
				photo: req.files["photo"][0]
					? req.files["photo"][0].filename
					: "avatar.jpg",
				isvalid: false,
				token: tokens,
				otp:otp
			});
            
			writeFileSync(path.join(__dirname, "../db/students.json"),JSON.stringify(students));
			res.redirect("/student/unverify");
}

// email sent for verifyemailcontroller
 const emailsentforVerify = (req, res) => {
		const students = JSON.parse(readFileSync(path.join(__dirname, "../db/students.json")));
		const id = req.params.id;
		const { sid, name, email, phone, department, photo, isvalid, token } =
			students.find((data) => data.id == id);
	 emailSend(email, {name,token});
	 res.render("emailsent",{
		id:sid,
		name:name,
		email:email,
		phone:phone,
		department:department,
		photo:photo

	 });

 }

 // sms send for verify 

 const smssentforVerify = (req, res) => {
	const students = JSON.parse(readFileSync(path.join(__dirname, "../db/students.json")));
	const id = req.params.id;
	const { sid, name, email, phone, department, photo, isvalid, token,otp } =
		students.find((data) => data.id == id);
	smsSend(phone,`Hi ${name} . your OTP code is ${otp}`);
	 res.render("smssent", {
			name
		});
 }
//  otp verification

const otpverifycontroller =  (req, res) => {
	  const otp = req.body.otp;
	  const students = JSON.parse(readFileSync(path.join(__dirname, "../db/students.json")));
			students[students.findIndex((data) => data.otp == otp)] = {
			...students[students.findIndex((data) => data.otp == otp)],
			isvalid: true,
			otp: "",
		};

		writeFileSync(
			path.join(__dirname, "../db/students.json"),
			JSON.stringify(students)
		);
		res.redirect("/");

 }

// email verifyemailcontroller

const verifyemailcontroller = (req, res) => {
	 const token = req.params.token;
	 const { email } = req.body;
	 const students = JSON.parse(readFileSync(path.join(__dirname, "../db/students.json")));
	  students[students.findIndex(data => data.token == token)] = {
			...students[students.findIndex(data=> data.token == token)],
			isvalid:true,
			token: ''
		};

	writeFileSync(
		path.join(__dirname, "../db/students.json"),
		JSON.stringify(students)
	);
	res.redirect('/');
}



module.exports = {
	showAllStudentsController,
	showAdnewStudentController,
	showUnverifyStudentController,
	showViewStudentController,
	storeStudentController,
	verifyemailcontroller,
	showEditStudentController,
	UpdatestudentListController,
	deleteStudentController,
	emailsentforVerify,
	smssentforVerify,
	otpverifycontroller,
};