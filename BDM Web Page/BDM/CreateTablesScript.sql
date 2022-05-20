USE BDM;

DROP TABLE IF EXISTS T_Comment;
DROP TABLE IF EXISTS T_Certificate;
DROP TABLE IF EXISTS TR_UserCourse;
DROP TABLE IF EXISTS T_PaymentMethod;
DROP TABLE IF EXISTS TR_CourseCategory;
DROP TABLE IF EXISTS T_Category;
DROP TABLE IF EXISTS T_File;
DROP TABLE IF EXISTS T_Level;
DROP TABLE IF EXISTS T_Course;
DROP TABLE IF EXISTS T_Message;
DROP TABLE IF EXISTS T_Chat;
DROP TABLE IF EXISTS T_User;
DROP TABLE IF EXISTS T_Name;

CREATE TABLE T_Name(
	id_name 			int NOT NULL AUTO_INCREMENT,
    first_name 			varchar(50) NOT NULL,
    middle_name 		varchar(50),
    last_name 			varchar(50),
    second_last_name 	varchar(50),
    PRIMARY KEY(id_name)
);

CREATE TABLE T_User(
	id_user			int NOT NULL AUTO_INCREMENT,
    fk_user_name 	int NOT NULL,
    userName		varchar(50) unique,
    user_password 	varchar(50) NOT NULL,
    gender 			varchar(50),
    email 			varchar(50) NOT NULL unique,
    photo			mediumblob,
    taken_down		boolean DEFAULT FALSE,
    usertype		varchar(50),
    PRIMARY KEY(id_user),
    FOREIGN KEY(fk_user_name) REFERENCES T_Name(id_name)
);

CREATE TABLE T_Chat(
	id_chat		int NOT NULL AUTO_INCREMENT,
    fk_student	int NOT NULL,
    fk_teacher	int NOT NULL,
    
    PRIMARY KEY(id_chat),
    FOREIGN KEY(fk_student) REFERENCES T_User(id_user),
    FOREIGN KEY(fk_teacher) REFERENCES T_User(id_user)
);

CREATE TABLE T_Course(
	id_course			int NOT NULL AUTO_INCREMENT,
    fk_instructor		int NOT NULL,
    title				text,
    image				mediumblob,
    general_rating		tinyint DEFAULT 0,
    level_quantity		int DEFAULT 0,
    course_description 	text,
    taken_down			boolean DEFAULT FALSE,
    full_price			float(13,2) DEFAULT 0,
    creation_date		date,
    
    PRIMARY KEY(id_course),
    FOREIGN KEY(fk_instructor) REFERENCES T_User(id_user)
);

CREATE TABLE T_Level(
	id_level		int NOT NULL AUTO_INCREMENT,
    fk_course		int NOT NULL,
    videoPath		text NOT NULL,
	level_index		int NOT NULL,
    level_cost		decimal(13,2) NOT NULL DEFAULT 0,
    taken_down		boolean DEFAULT FALSE,
    descripcion 	text,
    PRIMARY KEY(id_level),
    FOREIGN KEY(fk_course) REFERENCES T_Course(id_course)
);

CREATE TABLE T_File(
	id_file		int NOT NULL AUTO_INCREMENT,
    fk_level 	int NOT NULL,
	archivo		mediumblob NOT NULL,
    
    PRIMARY KEY(id_file),
    FOREIGN KEY(fk_level) REFERENCES T_Level(id_level)
);

CREATE TABLE T_Category(
	id_category 	int NOT NULL AUTO_INCREMENT,
    category_name	varchar(50) NOT NULL,
    fk_creator		int,
    creation_date	date,
    catDescription 	text,
    PRIMARY KEY(id_category),
    FOREIGN KEY(fk_creator) REFERENCES T_User(id_user)
);

CREATE TABLE TR_CourseCategory(
	id_course_category 	int NOT NULL AUTO_INCREMENT,
    fk_course 			int NOT NULL,
    fk_category 		int NOT NULL,
    
    PRIMARY KEY(id_course_category),
    FOREIGN KEY(fk_course) REFERENCES T_Course(id_course),
    FOREIGN KEY(fk_category) REFERENCES T_Category(id_category)
);

CREATE TABLE T_PaymentMethod(
	id_payment_method int NOT NULL AUTO_INCREMENT,
    method_name 		varchar(50),
    
    PRIMARY KEY(id_payment_method)
);

CREATE TABLE TR_UserCourse(
		id_user_course		int NOT NULL AUTO_INCREMENT,
        fk_user				int NOT NULL,
        fk_course 			int NOT NULL,
        fk_payment_method	int NOT NULL,
        conclusion_date		date,
        last_entry			datetime NOT NULL,
        inscription_date	datetime NOT NULL,
        progress			int NOT NULL,
        rating				tinyint,
        lastLevelPaid		int,
        amountPaid			float DEFAULT 0,
        
        PRIMARY KEY(id_user_course),
        FOREIGN KEY (fk_user) REFERENCES T_User(id_user),
        FOREIGN KEY (fk_course) REFERENCES T_Course(id_course),
        FOREIGN KEY (fk_payment_method) REFERENCES T_PaymentMethod(id_payment_method)
);

CREATE TABLE T_Certificate(
	id_certificate	int NOT NULL AUTO_INCREMENT,
    fk_student 		int NOT NULL,
    fk_course 		int NOT NULL,
    emission_date 	date NOT NULL,
    
    PRIMARY KEY(id_certificate),
    FOREIGN KEY(fk_student) REFERENCES T_User(id_user),
    FOREIGN KEY(fk_course) REFERENCES T_Course(id_course)
);

CREATE TABLE T_Comment(
	id_comment 				int NOT NULL AUTO_INCREMENT,
    fk_user					int NOT NULL,
    fk_course 				int NOT NULL,
    title					text,
    comment_description 	text NOT NULL,
    post_date				date NOT NULL,
    
    PRIMARY KEY(id_comment),
    FOREIGN KEY(fk_user) REFERENCES T_User(id_user),
    FOREIGN KEY(fk_course) REFERENCES T_Course(id_course)
);

CREATE TABLE T_Message(
	pk_message	int AUTO_INCREMENT NOT NULL,
    fk_chat		int NOT NULL,
    fk_user 	int NOT NULL,
    msg_description	text NOT NULL,
    send_date	datetime,
    
    PRIMARY KEY(pk_message),
    FOREIGN KEY (fk_chat) REFERENCES T_Chat(id_chat),
    FOREIGN KEY (fk_user) REFERENCES T_User(id_user)
);

INSERT INTO T_PaymentMethod(method_name)
VALUES("Efectivo");
        
DROP TRIGGER IF EXISTS BDM.Trig_UpdateGeneralRating;
delimiter //
CREATE TRIGGER Trig_UpdateGeneralRating    
    AFTER UPDATE  
        ON TR_UserCourse 
        FOR EACH ROW 
		BEGIN     
        	DECLARE amountStudents INT; 
            DECLARE totalRating INT;
            DECLARE avgRating INT;
            SET amountStudents = (SELECT count(id_user_course) FROM TR_UserCourse WHERE id_user_course = new.id_user_course); 
            
            SET totalRating = (SELECT sum(rating) FROM TR_UserCourse WHERE fk_course = new.fk_course);
            
            SET avgRating = totalRating/amountStudents;
			
            UPDATE T_Course
			SET general_rating = avgRating
            WHERE new.fk_course = T_Course.id_course;
		END//  
        