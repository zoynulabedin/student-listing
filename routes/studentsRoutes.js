const express = require('express');
const path = require('path');
const multer = require('multer');
const { showAllStudentsController, showAdnewStudentController, showUnverifyStudentController, showViewStudentController, storeStudentController, verifyemailcontroller, showEditStudentController, UpdatestudentListController, deleteStudentController, emailsentforVerify, smssentforVerify, otpverifycontroller } = require('../controllers/studentControllers');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		if (req.files.photo) {
			if (
				file.mimetype == "image/jpeg" ||
				file.mimetype == "image/png" ||
				file.mimetype == "image/jpg"
			) {
				cb(null, path.join(__dirname, "../public/images"));
			} else {
				console.log("invalid file type");
			}
		}

		
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + "_" + file.originalname);
	},
});

const studentsStoredatas = multer({
	storage,
}).fields([
	{
		name: "photo",
		maxCount: 1,
	},
	
]);



const Route = express.Router();

Route.get("/", showAllStudentsController);
Route.get("/student/create", showAdnewStudentController);
Route.get("/student/unverify", showUnverifyStudentController);
Route.post("/student/unverify", studentsStoredatas, storeStudentController);
Route.post("/student/otpverify", otpverifycontroller);
Route.get("/student/view/:id", showViewStudentController);
Route.get("/student/edit/:id", showEditStudentController);
Route.post("/student/update/:id",studentsStoredatas, UpdatestudentListController);
Route.get("/student/delete/:id", deleteStudentController);
Route.get("/student/emailsent/:id", emailsentforVerify);
Route.get("/student/smssent/:id", smssentforVerify);
Route.get("/student/verify/:token", verifyemailcontroller);

module.exports = Route;