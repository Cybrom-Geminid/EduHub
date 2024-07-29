const Student = require('../models/Student');

// Controller for handling student-related operations
const studentController = {
  // GET all students
  getAllStudents: async (req, res) => {
    try {
      const students = await Student.find()
        .populate('institute')
        .populate('batch')
        .populate('subject')
        .populate('program');
      res.json(students);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // GET a student by ID
  getStudentById: async (req, res) => {
    try {
      const student = await Student.findById(req.params._id)
        .populate('institute')
        .populate('batch')
        .populate('subject')
        .populate('program'); 
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }
      res.json(student);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // POST add a new student
  addStudent: async (req, res) => {
    // const student = new Student({
    //   name: req.body.name,
    //   age: req.body.age,
    //   grade: req.body.grade,
    //   institute: req.body.institute,
    //   batch: req.body.batch,
    //   subject: req.body.subject,
    //   program: req.body.program
    // });

    try {
      const student = new Student(req.body);
      const newStudent = await student.save();
      res.status(201).json(newStudent);
    } catch (error) {
      console.error(error)
      res.status(400).json({ message: error.message });
    }
  },

  // PUT update a student
  updateStudent: async (req, res) => {
    console.log(req.body);
    try {
      const student = await Student.findById(req.params._id);
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }

      // Update student fields with data from the request
      student.name = req.body.name || student.name;
      student.age = req.body.age || student.age;
      student.grade = req.body.grade || student.grade;
      student.institute = req.body.institute || student.institute;
      student.batch = req.body.batch || student.batch;
      student.subject = req.body.subject || student.subject;
      student.program = req.body.program || student.program;

      const updatedStudent = await student.save();
      res.json(updatedStudent);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  
  // DELETE a student
  deleteStudent: async (req, res) => {
    try {
      const studentId = req.params._id;
      console.log(`Attempting to delete student with ID: ${studentId}`);

      if (!studentId.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ message: 'Invalid student ID format' });
      }

      const student = await Student.findByIdAndDelete(studentId);
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }

      res.json({ message: 'Student deleted' });
    } catch (error) {
      console.error(Error `deleting student with ID ${req.params.id}: ${error.message}`);
      res.status(500).json({ message: error.message });
    }
  },

  // Search students by name
  searchStudents: async (req, res) => {
    const { query } = req.query;
    try {
      const students = await Student.find({ name: { $regex: new RegExp(query, 'i') } })
        .populate('institute')
        .populate('batch')
        .populate('subject')
        .populate('program');
      res.json(students);
    } catch (error) {
      res.status(500).json({ message: 'Failed to search students' });
    }
  },

  // Sort students by criteria
  sortStudents: async (req, res) => {
    const { criteria } = req.query;
    try {
      let students;
      if (criteria === 'name') {
        students = await Student.find().sort({ name: 1 })
          .populate('institute')
          .populate('batch')
          .populate('subject')
          .populate('program');
      } else if (criteria === 'age') {
        students = await Student.find().sort({ age: 1 })
          .populate('institute')
          .populate('batch')
          .populate('subject')
          .populate('program');
      } else {
        students = await Student.find()
          .populate('institute')
          .populate('batch')
          .populate('subject')
          .populate('program');
      }
      res.json(students);
    } catch (error) {
      res.status(500).json({ message: 'Failed to sort students' });
    }
  },

  // Filter students by grade
  filterStudentsByGrade: async (req, res) => {
    const { grade } = req.query;
    try {
      const students = await Student.find({ grade })
        .populate('institute')
        .populate('batch')
        .populate('subject')
        .populate('program');
      res.json(students);
    } catch (error) {
      res.status(500).json({ message: 'Failed to filter students by grade' });
    }
  }
};

module.exports = studentController;