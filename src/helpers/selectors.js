export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.filter(curDay => curDay.name === day);
  if (!state.days.length|| !state.days || !filteredDay.length) {
    return [];
  }
  const appointmentsIdArray = filteredDay[0].appointments;
  const appointmentsArray = Object.values(state.appointments)
  const appointmentsForDay = appointmentsArray.filter(appointment => appointmentsIdArray.includes(appointment.id));
  return appointmentsForDay;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const interviewers = Object.values(state.interviewers);
  const currInterviewer = interviewers.filter(interviewer => interviewer.id === interview.interviewer)

  const interviewerInfo = {
    id: currInterviewer[0].id,
    name: currInterviewer[0].name,
    avatar: currInterviewer[0].avatar
  };

  const interviewInfo = {student: interview.student};
  interviewInfo.interviewer = interviewerInfo;
  return interviewInfo;
}

export function getInterviewersForDay(state, day) {
  const filteredDay = state.days.filter(curDay => curDay.name === day);
  if (!state.days.length|| !state.days || !filteredDay.length) {
    return [];
  }
  const interviewersIdArray = filteredDay[0].interviewers;
  const interviewersArray = Object.values(state.interviewers)
  const interviewersForDay = interviewersArray.filter(interviewer => interviewersIdArray.includes(interviewer.id));
  return interviewersForDay;
}