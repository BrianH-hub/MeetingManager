import React from 'react';
import { Link } from 'react-router-dom';
import { Segment, Button, Header, Icon } from 'semantic-ui-react';


const NotFound = () => {
    return (
        <Segment placeholder>
            <Header icon>
                <Icon name='search' />
                Item was not found.
            </Header>
            <Segment.Inline>
                <Button as={Link} to='/activities' primary>
                    Return to Meetings
                </Button>
            </Segment.Inline>
        </Segment>
    );
};

export default NotFound;