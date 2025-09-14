
const teacherIds = new Set();
const generateTeacherId = () => {
  let teacherId;
  do {
    teacherId = '';
    for (let i = 0; i < 10; i++) {
      teacherId += Math.floor(Math.random() * 10); 
    }
  } while (teacherIds.has(teacherId));
  teacherIds.add(teacherId);
  return teacherId;
};
export { generateTeacherId };
