module.exports = { 
	user:{ 
		name:{type:String,required:true},
		password:{type:String,required:true}
	},
	devModel:{
		model:{type:String,required:true},
		name:{type:String,required:false}
	},
	task:{
        missile:{type:String,required:true},
		name:{type:String,required:true},
		status:{type:String,required:true},
		progress:{type:String,required:true},
		start:{type:String,required:true}
	}
};