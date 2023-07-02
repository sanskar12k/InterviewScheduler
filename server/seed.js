const mongoose = require('mongoose');
const express = require('express')
const app = express();
const User = require('./models/user');
const Admin = require('./models/admin');
const {DateModel } = require('./models/date');
const Candidate = require('./models/candidate');

if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

mongoose.connect(process.env.MONGO_D,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
  .then(()=>console.log('Connected to DB'))
  .catch((e)=> console.log(e))
const users = [ {fname: "Ava", lname: "Miller", email: "robert@example.com", iTrack: "HR", specialisation: ["VLSI"], password: "8738620311"},
{fname: "Sophia", lname: "Collins", email: "michael@example.com", iTrack: "Technical", specialisation: ["Engineering", "Embedded"], password: "9174657924"},
{fname: "Emily", lname: "Anderson", email: "amelia@example.com", iTrack: "Managerial", specialisation: ["Control Systems", "VLSI"], password: "6369311091"},
{fname: "Amelia", lname: "Hall", email: "daniel1@example.com", iTrack: "Managerial", specialisation: ["VLSI", "Masters Computer Science"], password: "0619293588"},
{fname: "Daniel", lname: "Turner", email: "sophia@example.com", iTrack: "Technical", specialisation: ["Control Systems"], password: "3194738935"},
{fname: "Michael", lname: "Brown", email: "ava@example.com", iTrack: "Managerial", specialisation: ["Embedded", "Masters Computer Science", "Engineering"], password: "7539209681"},
{fname: "Olivia", lname: "Robinson", email: "michael1@example.com", iTrack: "HR", specialisation: ["VLSI"], password: "8731525202"},
{fname: "Emma", lname: "Allen", email: "christopher@example.com", iTrack: "Managerial", specialisation: ["Bachelors Computer Science", "Signal Processing & Communication"], password: "3396597895"},
{fname: "Joshua", lname: "Young", email: "amelia1@example.com", iTrack: "Managerial", specialisation: ["VLSI", "Signal Processing & Communication", "Masters Computer Science"], password: "4124224491"},
{fname: "Charlotte", lname: "Evans", email: "daniel@example.com", iTrack: "Managerial", specialisation: ["Signal Processing & Communication", "VLSI"], password: "5228194657"},   
{fname: "Amelia", lname: "Wright", email: "andrew@example.com", iTrack: "Managerial", specialisation: ["Control Systems"], password: "0331635922"},
{fname: "Emma", lname: "Green", email: "charlotte@example.com", iTrack: "Managerial", specialisation: ["Embedded", "Bachelors Computer Science"], password: "0028726795"},        
{fname: "Sophia", lname: "Miller", email: "emily1@example.com", iTrack: "Technical", specialisation: ["Engineering", "VLSI"], password: "9493555418"},
{fname: "Joshua", lname: "Smith", email: "alice@example.com", iTrack: "Technical", specialisation: ["Masters Computer Science", "VLSI"], password: "7808832997"},
{fname: "Mia", lname: "Turner", email: "emily@example.com", iTrack: "HR", specialisation: ["Engineering", "Control Systems"], password: "3610229273"},
{fname: "Alice", lname: "Smith", email: "alice1@example.com", iTrack: "HR", specialisation: ["Bachelors Computer Science"], password: "9316450057"},
{fname: "Andrew", lname: "Taylor", email: "daniel2@example.com", iTrack: "Technical", specialisation: ["VLSI", "Embedded"], password: "7338563676"},
{fname: "Robert", lname: "Johnson", email: "isabella@example.com", iTrack: "Technical", specialisation: ["Signal Processing & Communication", "Bachelors Computer Science"], password: "3945101782"},
{fname: "David", lname: "Brown", email: "john@example.com", iTrack: "Technical", specialisation: ["Signal Processing & Communication", "Engineering", "Embedded"], password: "4015880098"},
{fname: "Joseph", lname: "Anderson", email: "john1@example.com", iTrack: "HR", specialisation: ["Embedded"], password: "5925309541"} ]

const admin = [
    {fname:"Sanskar", lname:"Gupta", email:"sanskarmodanwal8@gmail.com", emp_id:12345, password:"12345678910"},
    {fname:"Nikhil", lname:"Singh", email:"nikhil8@gmail.com", emp_id:6789, password:"12345678910"},
]

const dateString = '2023-06-30T12:00:00Z';
const dateString2 = '2023-07-30T12:00:00Z';
const dates = [
    {date:new Date(dateString), time:['9', '10', '12']},
    {date:new Date(dateString2), time:['10', '12', '13']},
    
]

const candi = [
    { fname: "Aarav", lname: "Pillai", email: "aarav.pillai@example.com", phNumber: "4138832437", specialisation: "Engineering" },
    { fname: "Aarushi", lname: "Gupta", email: "aarushi.gupta@example.com", phNumber: "9441018097", specialisation: "Bachelors Computer Science" },
    { fname: "Abhinav", lname: "Gupta", email: "abhinav.gupta@example.com", phNumber: "6276724784", specialisation: "Engineering" },
    { fname: "Aditi", lname: "Chauhan", email: "aditi.chauhan@example.com", phNumber: "9415001147", specialisation: "Embedded" },
    { fname: "Akshay", lname: "Mahajan", email: "akshay.mahajan@example.com", phNumber: "5804686369", specialisation: "VLSI" },
    { fname: "Aman", lname: "Joshi", email: "aman.joshi@example.com", phNumber: "6069583689", specialisation: "Engineering" },
    { fname: "Amit", lname: "Kumar", email: "amit.kumar@example.com", phNumber: "0817398171", specialisation: "Embedded" },
    { fname: "Ananya", lname: "Yadav", email: "ananya.yadav@example.com", phNumber: "2663562276", specialisation: "Embedded"},
    { fname: "Anika", lname: "Singh", email: "anika.singh@example.com", phNumber: "5796136371", specialisation: "Masters Computer Science" },
    { fname: "Aniket", lname: "Agarwal", email: "aniket.agarwal@example.com", phNumber: "4923690618", specialisation: "Signal Processing & Communication" },
    { fname: "Anisha", lname: "Mishra", email: "anisha.mishra@example.com", phNumber: "6080426044", specialisation: "Bachelors Computer Science" },
    { fname: "Anjali", lname: "Yadav", email: "anjali.yadav@example.com", phNumber: "2539058258", specialisation: "VLSI" },
    { fname: "Ankit", lname: "Srivastava", email: "ankit.srivastava@example.com", phNumber: "1994318892", specialisation: "Bachelors Computer Science" },
    { fname: "Ansh", lname: "Joshi", email: "ansh.joshi@example.com", phNumber: "7897563997", specialisation: "VLSI" },
    { fname: "Anushka", lname: "Kumar", email: "anushka.kumar@example.com", phNumber: "2680637034", specialisation: "Control Systems" },
    { fname: "Aryan", lname: "Sharma", email: "aryan.sharma@example.com", phNumber: "2804076379", specialisation: "Engineering" },
    { fname: "Arjun", lname: "Bhatia", email: "arjun.bhatia@example.com", phNumber: "6295648753", specialisation: "Bachelors Computer Science" },
    { fname: "Ashish", lname: "Nair", email: "ashish.nair@example.com", phNumber: "6423932854", specialisation: "Masters Computer Science" },
    { fname: "Ayush", lname: "Srivastava", email: "ayush.srivastava@example.com", phNumber: "4503865228", specialisation: "Signal Processing & Communication" },
    { fname: "Dhruv", lname: "Patel", email: "dhruv.patel@example.com", phNumber: "3017209692", specialisation: "Control Systems" },
    { fname: "Divya", lname: "Verma", email: "divya.verma@example.com", phNumber: "5139937396", specialisation: "Masters Computer Science" },
    { fname: "Gaurav", lname: "Verma", email: "gaurav.verma@example.com", phNumber: "2321951812", specialisation: "Bachelors Computer Science"},
    { fname: "Himanshu", lname: "Sharma", email: "himanshu.sharma@example.com", phNumber: "0724039271", specialisation: "Engineering"},
    { fname: "Isha", lname: "Mehra", email: "isha.mehra@example.com", phNumber: "9190821364", specialisation: "Signal Processing & Communication" },
    { fname: "Ishita", lname: "Pillai", email: "ishita.pillai@example.com", phNumber: "4836576689", specialisation: "Control Systems" },
    { fname: "Karan", lname: "Kumar", email: "karan.kumar@example.com", phNumber: "6674919054", specialisation: "VLSI" },
    { fname: "Kriti", lname: "Srivastava", email: "kriti.srivastava@example.com", phNumber: "6837971791", specialisation: "Signal Processing & Communication" },
    { fname: "Manish", lname: "Rao", email: "manish.rao@example.com", phNumber: "8702427922", specialisation: "VLSI" },
    { fname: "Mehak", lname: "Chauhan", email: "mehak.chauhan@example.com", phNumber: "1193017948", specialisation: "VLSI" },
    { fname: "Mohan", lname: "Jain", email: "mohan.jain@example.com", phNumber: "0469719748", specialisation: "Embedded" },
    { fname: "Mohit", lname: "Srivastava", email: "mohit.srivastava@example.com", phNumber: "5681301295", specialisation: "Signal Processing & Communication" },
    { fname: "Neha", lname: "Jain", email: "neha.jain@example.com", phNumber: "1766313300", specialisation: "Masters Computer Science" },
    { fname: "Nikhil", lname: "Mehra", email: "nikhil.mehra@example.com", phNumber: "6807039887", specialisation: "Engineering" },
    { fname: "Nisha", lname: "Mehra", email: "nisha.mehra@example.com", phNumber: "7151144830", specialisation: "Signal Processing & Communication"},
    { fname: "Pooja", lname: "Joshi", email: "pooja.joshi@example.com", phNumber: "9845491470", specialisation: "VLSI" },
    { fname: "Prachi", lname: "Mahajan", email: "prachi.mahajan@example.com", phNumber: "7946528989", specialisation: "VLSI" },
    { fname: "Pranav", lname: "Mehra", email: "pranav.mehra@example.com", phNumber: "3911109415", specialisation: "Engineering" },
    { fname: "Priya", lname: "Patel", email: "priya.patel@example.com", phNumber: "8573716479", specialisation: "Control Systems"},
    { fname: "Rahul", lname: "Mahajan", email: "rahul.mahajan@example.com", phNumber: "7583963522", specialisation: "Bachelors Computer Science" },
    { fname: "Rajat", lname: "Chauhan", email: "rajat.chauhan@example.com", phNumber: "3689969647", specialisation: "Embedded" },
    { fname: "Rajesh", lname: "Yadav", email: "rajesh.yadav@example.com", phNumber: "7771102852", specialisation: "VLSI" },
    { fname: "Rakhi", lname: "Agarwal", email: "rakhi.agarwal@example.com", phNumber: "5100246739", specialisation: "Bachelors Computer Science" },
    { fname: "Riya", lname: "Mahajan", email: "riya.mahajan@example.com", phNumber: "4872145438", specialisation: "Masters Computer Science" },
    { fname: "Rohit", lname: "Chauhan", email: "rohit.chauhan@example.com", phNumber: "1791262525", specialisation: "VLSI" },
    { fname: "Sakshi", lname: "Rao", email: "sakshi.rao@example.com", phNumber: "5394496391", specialisation: "Bachelors Computer Science" },
    { fname: "Sandeep", lname: "Mishra", email: "sandeep.mishra@example.com", phNumber: "3889176275", specialisation: "Signal Processing & Communication" },
    { fname: "Shilpa", lname: "Pillai", email: "shilpa.pillai@example.com", phNumber: "5880292599", specialisation: "Embedded" },
    { fname: "Shivam", lname: "Gupta", email: "shivam.gupta@example.com", phNumber: "6209962416", specialisation: "Engineering" },
    { fname: "Shubham", lname: "Agarwal", email: "shubham.agarwal@example.com", phNumber: "7535175597", specialisation: "Embedded"},
    { fname: "Sneha", lname: "Kumar", email: "sneha.kumar@example.com", phNumber: "8748976112", specialisation: "Control Systems"}
]
const seedDB = async () => {

   try{
    // const del = await User.deleteMany({});
    // const delAdmin = await Admin.deleteMany({});
    // // const date = await Time.deleteMany({});
    // const cand = await Candidate.deleteMany({});
    // for (let i = 0; i < users.length; i++) {
    //     const user = new User ({fname:users[i].fname, email:users[i].email, iTrack:users[i].iTrack, specialisation:users[i].specialisation, password:users[i].password});
    //     console.log(user);
    //     await user.save();
    // }
    // for (let i = 0; i < admin.length; i++) {
    //     const user = new Admin ({fname:admin[i].fname, email:admin[i].email, emp_id:admin[i].emp_id, password:admin[i].password});
    //     console.log(user);
    //     await user.save();
    // }
    // for (let i = 0; i < candi.length; i++) {
    //     console.log("Cand", candi[i].lname);
    //     const time = new Candidate ({fname:candi[i].fname, lname:candi[i].lname, email:candi[i].email, phNumber:candi[i].phNumber, specialisation:candi[i].specialisation});
    //     console.log(time);
    //     await time.save();
    // }
    const cid = new mongoose.Types.ObjectId('64a15fd9dece4920b63bf792');
    const uid = new mongoose.Types.ObjectId('64a15fd7dece4920b63bf752');
    // const candList = new InterviewModel({candidate:cid});
    // console.log(candList)
    const newCand = {
        cand:cid
    };
    const user = await User.findById(uid);
    user.candidateList.push(cid)
    const candidate = await Candidate.findById(cid);
    // candidate.interViewerList[0] = uid;
    // console.log(candidate);
    await user.save();
    console.log(user);
    // await candidate.save();
    // await candList.save();

    }
    catch(e){
        console.log(e)
    }
}
seedDB().then(() => {
    mongoose.connection.close();
})