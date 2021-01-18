const postModel = require("../models/Posts");
const validation = require("./validation");
const moment = require("moment");

module.exports = {
    getData: async (req, res) => {
        const dataPosts = [];
        const tempData = await postModel.find();

        if (tempData) {
            tempData.forEach(data => {
                let tempDate = moment(data.create_dt).format("lll");
                // console.log(moment(data.create_dt).format("lll"));
                // data.title = "test"
                dataPosts.push({
                    'title': data.title,
                    'description': data.description,
                    'create_by': data.create_by,
                    'create_dt': tempDate
                });
            });
        }

        res.render("home", {
            dataPosts: dataPosts
        });
    },
    postData: async (req, res) => {
        const errors = [];
        const title = req.body.title;
        const description = req.body.description;
        const createBy = req.session.userName;

        const {
            error
        } = validation.postValidation(req.body);

        if (error) {
            errors.push({
                msg: error.details[0]["message"]
            });
        }

        if (errors.length > 0) {
            res.render("home", {
                errors
            });
        } else {
            const newPost = new postModel({
                title,
                description,
                create_by: createBy
            });

            try {
                const savedPost = await newPost.save();
                req.flash("success_msg", "Post Saved!");
                res.redirect("/posts/");
            } catch (err) {
                res.send(err);
            }
        }
    }
};