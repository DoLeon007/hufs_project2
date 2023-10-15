const fs = require('fs')

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const port = process.env.port || 4000;

app.use(bodyParser.json());
app.use(cors({
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
}));
// cors 권한 추가 설정: 실제 앱 등록시 외부 제약 방지

const data = fs.readFileSync('./db.json');
const conf = JSON.parse(data);

const connection = mysql.createConnection({
  host: conf.host,
   // RDS 엔드포인트
  user: conf.user,
   // RDS 마스터 사용자 이름
  password: conf.password,
   // RDS 비밀번호
  port: conf.port,
   // RDS 포트
  database: conf.database
   // 데이터베이스 이름
});

//db 연결
connection.connect((err) => {
    if (err) {
      console.error("Error connecting to the database: ", err);
      return;
    }
    console.log("Connected to the database!");
});

//데이터 조회

// 1.메인
app.get('/', (req, res) => {
  res.send('홈')
});

// 2. 음료 목록
app.get("/drink", (req, res) => {
  connection.query("SELECT * FROM hufs.drink", (error, results, fields) => {
    if (error) {
      console.error("Error retrieving users: ", error);
      res.status(500).send({ message: "Error retrieving users" });
      return;
    }
    // 로그 추가: 응답 데이터를 콘솔에 출력
    //console.log("Response data for /drink: ", results);
    
    console.log("success");
    res.send(results);
  });
}); 

// 3. 유저 정보
app.get("/user", (req, res) => {
  connection.query("SELECT * FROM hufs.user", (error, results, fields) => {
    if (error) {
      console.error("Error retrieving users: ", error);
      res.status(500).send({ message: "Error retrieving users" });
      return;
    }
    console.log("success");
    res.send(results);
  });
}); 

app.post("/user", (req, res) => {
  console.log("Received user data:", req.body);

  const { u_token, u_name, height, weight, age, sex, activity_level, u_sugar_gram } = req.body;

  const query = `
    INSERT INTO hufs.user (u_token, u_name, height, weight, age, sex, activity_level, u_sugar_gram) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  connection.query(query, [u_token, u_name, height, weight, age, sex, activity_level, u_sugar_gram], 
  (error, results, fields) => {
    if (error) {
      console.error("Error inserting user data: ", error);
      res.status(500).send({ message: "Error inserting user data" });
      return;
    }
    console.log("User data inserted successfully.");
    res.status(201).send({ message: "User data inserted successfully." });
  });
});

// 4. 즐겨찾기
app.post("/favorite", (req, res) => {
  const { user, drink } = req.body;

  const query = `
    INSERT INTO hufs.favorite (user, drink) 
    VALUES (?, ?)
  `;

  connection.query(query, [user, drink], 
  (error, results, fields) => {
    if (error) {
      console.error("Error inserting favorite data: ", error);
      res.status(500).send({ message: "Error inserting favorite data" });
      return;
    }
    console.log("Favorite data inserted successfully.");
    res.status(201).send({ message: "Favorite data inserted successfully." });
  });
});



//서버 구동
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});