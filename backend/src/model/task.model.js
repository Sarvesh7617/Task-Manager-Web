import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
},
  description: {
    type:String
},
  status: { 
    type: String, 
    enum: ['Todo', 'In Progress', 'Completed'], 
    default: 'Todo' 
},
  priority: { 
    type: String, 
    enum: ['Low', 'Medium', 'High'], 
    default: 'Medium' 
},
  creator: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
},
  assignee: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
}
}, { timestamps: true });

export const Task= mongoose.model('Task', taskSchema);
