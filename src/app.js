const path = require("path");
const express = require('express');
const app = express();
require('./db');

const publicPath = path.resolve(__dirname, "public");

app.use(express.static(publicPath));
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'hbs');

const mongoose = require('mongoose');
const Answer = mongoose.model('Person');

const questions = {q1: "How are you feeling", q2: "When was the last time you ate?"}

app.get("/", (req, res) => {
	res.render("home", {questions, questions})
})

app.post("/", (req, res) => {
	count = 0
	const answers = req.body["answer"]
	for (let question in questions) {
		console.log(answers[count])
		const QA = new Answer ({
		question: questions[question],
		answer: answers[count]
		})
		QA.save()
		count++;
	}
	res.redirect("review-survey")
})

app.get("/review-survey", (req, res) => {
	Answer.find((err, QA) => {
		res.render("reviewSurvey", {QA: QA});
	});
})

app.get("/css/styles.css");
app.listen(3000, '127.0.0.1');
