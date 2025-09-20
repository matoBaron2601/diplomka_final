CREATE TABLE "option" (
	"id" varchar PRIMARY KEY NOT NULL,
	"questionId" varchar NOT NULL,
	"text" varchar NOT NULL,
	"isCorrect" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE "question" (
	"id" varchar PRIMARY KEY NOT NULL,
	"quizId" varchar NOT NULL,
	"text" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "quiz" (
	"id" varchar PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" varchar PRIMARY KEY NOT NULL,
	"email" varchar NOT NULL,
	"name" varchar NOT NULL,
	"profilePicture" varchar NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "option" ADD CONSTRAINT "option_questionId_question_id_fk" FOREIGN KEY ("questionId") REFERENCES "public"."question"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "question" ADD CONSTRAINT "question_quizId_quiz_id_fk" FOREIGN KEY ("quizId") REFERENCES "public"."quiz"("id") ON DELETE no action ON UPDATE no action;