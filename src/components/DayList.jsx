import React from "react";
import DayListItem from "./DayListItem";

export default function DayList (props) {
  const dayList = props.days;
  const parsedData = dayList.map(day => <DayListItem key={day.id} name={day.name} spots={day.spots} selected={day.name === props.day} setDay={props.setDay}/>);

  return (
    <ul>
      {parsedData}
    </ul>
  )
}