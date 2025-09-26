CREATE TABLE "userAnswer" (
	"id" varchar PRIMARY KEY NOT NULL,
	"userId" varchar NOT NULL,
	"questionId" varchar NOT NULL,
	"optionId" varchar NOT NULL,
	"answeredAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "userQuiz" (
	"id" varchar PRIMARY KEY NOT NULL,
	"userId" varchar NOT NULL,
	"quizId" varchar NOT NULL,
	"openedAt" timestamp DEFAULT now() NOT NULL,
	"submittedAt" timestamp
);
--> statement-breakpoint
ALTER TABLE "quiz" ADD COLUMN "creatorId" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "quiz" ADD COLUMN "createdAt" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "quiz" ADD COLUMN "timePerQuestion" numeric;--> statement-breakpoint
ALTER TABLE "quiz" ADD COLUMN "canGoBack" boolean;--> statement-breakpoint
ALTER TABLE "userAnswer" ADD CONSTRAINT "userAnswer_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "userAnswer" ADD CONSTRAINT "userAnswer_questionId_question_id_fk" FOREIGN KEY ("questionId") REFERENCES "public"."question"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "userAnswer" ADD CONSTRAINT "userAnswer_optionId_option_id_fk" FOREIGN KEY ("optionId") REFERENCES "public"."option"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "userQuiz" ADD CONSTRAINT "userQuiz_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "userQuiz" ADD CONSTRAINT "userQuiz_quizId_quiz_id_fk" FOREIGN KEY ("quizId") REFERENCES "public"."quiz"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quiz" ADD CONSTRAINT "quiz_creatorId_user_id_fk" FOREIGN KEY ("creatorId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;