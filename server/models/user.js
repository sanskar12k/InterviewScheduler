//INTERVIEWER 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { DateModel  } = require('./date');
const Candidate = require('./candidate');

const userSchema = new Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Email already exist"]
    },
    phNumber: {
        type: String
    },
    iTrack: { //Interview track
        type: String,
        required: true,
        enum: ['Technical', 'Managerial', 'HR']
    },
    specialisation:
    [{
        type: String
    }]
    ,
    password: {
        type: String,
        required: true
    },
    dateNdTime:[ {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DateModel',
    }],
    availablity: {
        type: [Boolean],
        default: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    candidateList:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Candidate'
    }]
})


// userSchema.pre('save' , async function(next) {
//   if(this.isModified('hash')){
//       this.hash = await bcrypt.hash(this.hash, 12);
//       // this.cpassword = await bcrypt.hash(this.cpassword, 12);
//   }
//   next();
// });


// userSchema.methods.genToken = async function(){
//   try{
//     console.log(this._id, 'dkmk')
//     const tkrn = jwt.sign({_id: this._id, fnme: this.fname, role:this.role}, process.env.SECKEY);
//     return tkrn;
//   }catch(e){
//     console.log(e);
//   }
// }

// userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', userSchema);