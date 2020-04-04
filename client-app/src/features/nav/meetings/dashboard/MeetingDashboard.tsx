import React from "react";
import { Grid, List } from "semantic-ui-react";

export const MeetingDashboard = () => {


  
  return (


    <Grid>
      <Grid.Column width={10}>
        Meeting List
                  <List>
          {this.state.meetings.map((meeting: any) =>(
            <List.Item key={meeting.id}>{meeting.title}</List.Item>
          ))}
        </List>
      </Grid.Column>
    </Grid>
  );
};


export default MettingsDashboard;