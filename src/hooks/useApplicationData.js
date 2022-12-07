import { useState, useEffect } from "react";
import axios from "axios";
import { updateSpots } from "helpers/selectors";

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

    const newDays = updateSpots(state, appointments)

    return axios.put(`/api/appointments/${id}`, {
      interview
    })
    .then(() => {
      setState({
        ...state,
        appointments,
        days: newDays
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

    const newDays = updateSpots(state, appointments)

    return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      setState({
        ...state,
        appointments,
        days: newDays
      }); 
    })
  }
  

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
      .then((all) => {
        setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
      });
  }, [setState]);

  return {state, setState, setDay, bookInterview, cancelInterview};
}


