import { useState } from "react";
import axios from "axios";

export default function useApplicationData (initial) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  const setDay = day => setState({ ...state, day });
  
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const dayInfo = state.days.filter((day) => day.name.includes(state.day))[0];
    const appointmentsByDay = Object.values(appointments).filter(appointment => dayInfo.appointments.includes(appointment.id));
    const spots = appointmentsByDay.filter((appointment => !appointment.interview)).length;
    dayInfo.spots = spots;
    const days = state.days;
    days[dayInfo.id - 1] = dayInfo;

    return axios.put(`/api/appointments/${id}`, {
      interview
    })
    .then(() => {
      setState({
        ...state,
        appointments,
        days
      })
    })
  }
  
  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const dayInfo = state.days.filter((day) => day.name.includes(state.day))[0];
    const appointmentsByDay = Object.values(appointments).filter(appointment => dayInfo.appointments.includes(appointment.id));
    const spots = appointmentsByDay.filter((appointment => !appointment.interview)).length;
    dayInfo.spots = spots;
    const days = state.days;
    days[dayInfo.id - 1] = dayInfo;
    
    return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      setState({
        ...state,
        appointments,
        days
      }); 
    })
  }
  
  return {state, setState, setDay, bookInterview, cancelInterview};
}


