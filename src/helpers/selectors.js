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
