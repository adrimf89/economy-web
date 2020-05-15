import React from 'react';
import {Card, Icon, Responsive, Statistic} from 'semantic-ui-react';

const CardInfo = props => {
    return (
        <Card>
            <Card.Content textAlign="center">
                <Responsive
                    {...Responsive.onlyMobile}
                    as={Statistic}
                    size="mini">
                        <Statistic.Value>
                            <Icon name={props.icon} /> {props.value}
                            </Statistic.Value>
                        <Statistic.Label>{props.label}</Statistic.Label>
                </Responsive>

                <Responsive
                    {...Responsive.onlyTablet}
                    as={Statistic}
                    size="mini" >
                        <Statistic.Value>
                            <Icon name={props.icon} /> {props.value}
                            </Statistic.Value>
                        <Statistic.Label>{props.label}</Statistic.Label>
                </Responsive>

                <Responsive
                    {...Responsive.onlyComputer}
                    as={Statistic}
                    size="tiny">
                        <Statistic.Value>
                            <Icon name={props.icon} /> {props.value}
                            </Statistic.Value>
                        <Statistic.Label>{props.label}</Statistic.Label>
                </Responsive>
            </Card.Content>
        </Card>
    );
}

export default CardInfo;