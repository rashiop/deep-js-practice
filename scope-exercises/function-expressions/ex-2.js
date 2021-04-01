const getStudentById = (id) => {
  return studentRecords.find((record) => record.id == id);
};

const printRecords = (recordIds) => {
  const students = recordIds.map(getStudentById);

  students.sort((student1, student2) => {
    if (student1.name < student2.name) return -1;
    else if (student1.name > student2.name) return 1;
    else return 0;
  });

  students.forEach((student) => {
    const paidStatus = student.paid ? 'Paid' : 'Not Paid';
    console.log(`${student.name} (${student.id}): ${paidStatus}`);
  });
};

const paidStudentsToEnroll = () => {
  const recordsToEnroll = studentRecords.filter((student) => {
    if (student.paid && !currentEnrollment.includes(student.id)) {
      return student;
    }
  });

  const idsToEnroll = recordsToEnroll.map((student) => {
    return student.id;
  });

  return [...currentEnrollment, ...idsToEnroll];
};

const remindUnpaid = (recordIds) => {
  const unpaidIds = recordIds.filter((studentId) => {
    const student = getStudentById(studentId);
    return !student.paid;
  });

  printRecords(unpaidIds);
};

// ********************************

var currentEnrollment = [410, 105, 664, 375];

var studentRecords = [
  { id: 313, name: 'Frank', paid: true },
  { id: 410, name: 'Suzy', paid: true },
  { id: 709, name: 'Brian', paid: false },
  { id: 105, name: 'Henry', paid: false },
  { id: 502, name: 'Mary', paid: true },
  { id: 664, name: 'Bob', paid: false },
  { id: 250, name: 'Peter', paid: true },
  { id: 375, name: 'Sarah', paid: true },
  { id: 867, name: 'Greg', paid: false },
];

printRecords(currentEnrollment);
console.log('----');
currentEnrollment = paidStudentsToEnroll();
printRecords(currentEnrollment);
console.log('----');
remindUnpaid(currentEnrollment);

/*
	Bob (664): Not Paid
	Henry (105): Not Paid
	Sarah (375): Paid
	Suzy (410): Paid
	----
	Bob (664): Not Paid
	Frank (313): Paid
	Henry (105): Not Paid
	Mary (502): Paid
	Peter (250): Paid
	Sarah (375): Paid
	Suzy (410): Paid
	----
	Bob (664): Not Paid
	Henry (105): Not Paid
*/
