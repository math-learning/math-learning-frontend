const _ = require('lodash');

export const isProfessor = (profile) => profile.role === 'professor';

export const isProfessorOfCourse = ({ profile, course }) => (
  course
    && course.professors
    && course.professors.some((professor) => professor.userId === profile.userId)
);

export const sortUsersArray = (users) => {
  const sortedUsers = _.cloneDeep(users);

  sortedUsers.sort((a, b) => {
    if (a.role === 'creator') {
      return -1;
    }
    if (b.role === 'creator') {
      return 1;
    }
    if (a.role === 'professor' && b.role === 'student') {
      return -1;
    }
    if (b.role === 'professor' && a.role === 'student') {
      return 1;
    }
    return 0;
  });

  return sortedUsers;
};
