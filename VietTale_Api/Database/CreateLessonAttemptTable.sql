CREATE TABLE LessonAttempts (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    UserId NVARCHAR(450) NOT NULL,
    LessonId INT NOT NULL,
    StartTime DATETIME NOT NULL,
    CompletionTime DATETIME NULL,
    Score INT NOT NULL DEFAULT 0,
    TotalQuestions INT NOT NULL DEFAULT 0,
    CorrectAnswers INT NOT NULL DEFAULT 0,
    IsCompleted BIT NOT NULL DEFAULT 0,
    CONSTRAINT FK_LessonAttempts_Users FOREIGN KEY (UserId) REFERENCES AspNetUsers(Id),
    CONSTRAINT FK_LessonAttempts_Lessons FOREIGN KEY (LessonId) REFERENCES Lessons(Id)
); 