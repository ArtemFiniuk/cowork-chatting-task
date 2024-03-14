const express = require('express');
const router = express.Router();
const multer = require("multer");
const controller = require("../controller/controller");
const member = require("../controller/member");
const spaces = require("../controller/spaces");
const files = require("../controller/files");
const announcement = require("../controller/announcement");
const invoice = require("../controller/invoice");
const settings = require("../controller/settings");
const task = require("../controller/task");



// image path
const storage = multer.diskStorage({
    destination: './image',
    filename: (req, file, cb) => {
        return cb(null, `${file.originalname}`)
    }
});
const upload = multer({
    storage: storage
})

// routes api
// admin login and registration
router.post('/adminRegistration', controller.adminRegistration)
router.post('/adminLogin', controller.adminLogin)
router.put('/memberPassword', controller.memberPassword)
// add member
router.post('/memberCreate', upload.single('member_image'), member.memberCreate)
router.get('/memberList', member.memberList)
router.get('/memberSingle/:id', member.memberSingle)
router.put('/editMember/:id', upload.single('member_image'), member.editMember)
router.get('/memberSearch/:id', member.memberSearch)

// add spaces
router.post('/spacesCreate', upload.single('space_image'), spaces.spacesCreate)
router.get('/spacesList', spaces.spacesList)
router.get('/spacesSingle/:id', spaces.spacesSingle)
router.put('/editSpaces/:id', upload.single('space_image'), spaces.editSpaces)
// add files
router.post('/filesCreate', upload.single('files_upload'), files.filesCreate)
router.get('/filesList', files.filesList)
router.get('/favoriteList', files.favoriteList)
router.delete('/deleteFiles/:id', files.deleteFiles)
router.put('/fileFavorite/:id', files.fileFavorite)
router.put('/fileShare/:id', files.fileShare)
// add announcement
router.post('/postCreate', upload.single('post_image'), announcement.postCreate)
router.get('/postList', announcement.postList)
// router.delete('/deleteFiles/:id', files.deleteFiles)

// add invoice
router.post('/invoiceCreate', invoice.invoiceCreate)
router.get('/invoicesList', invoice.invoicesList)
router.get('/invoiceSingle/:id', invoice.invoiceSingle)
router.put('/invoicePayment/:id', invoice.invoicePayment)

// add settings
router.post('/profileCreate', upload.fields([{ name: 'companyLogo', maxCount: 1 }, { name: 'background', maxCount: 1 }]), settings.profileCreate)
router.get('/profileSingle', settings.profileSingle)
router.put('/updateProfile/:id', upload.fields([{ name: 'companyLogo', maxCount: 1 }, { name: 'background', maxCount: 1 }]), settings.updateProfile)
router.post('/customCreate', settings.customCreate)

// add task
router.post('/taskCreate', upload.single('task_image'), task.taskCreate)
router.get('/taskList/:id', task.taskList)
router.put('/taskStatus/:id', task.taskStatus)





module.exports = router;
