import React from 'react';
import { connect } from 'react-redux';
import { fetchMonthBoard } from '../actions/statisticsAction'

import { Button, 
        Card, 
        Checkbox, 
        Container, 
        Grid,
        Icon, 
        Label,
        Responsive, 
        Segment, 
        Statistic,
        Table } from 'semantic-ui-react';
import CardInfo from '../components/CardInfo';

class MonthStatistics extends React.Component {
    componentDidMount() {
        this.props.fetchMonthBoard(new Date(), false);
    }

    onNextMonth = () => {
        let newDate = this.props.selectedDate;
        newDate.setDate(1);
        newDate.setMonth(newDate.getMonth()+1);

        this.props.fetchMonthBoard(newDate, this.props.showPlanned);
    }

    onCurrentMonth = () => {
        this.props.fetchMonthBoard(new Date(), this.props.showPlanned);
    }

    onPreviousMonth = () => {
        let newDate = this.props.selectedDate;
        newDate.setDate(1);
        newDate.setMonth(newDate.getMonth()-1);

        const showPlanned = this.isPastMonth() ? false : this.props.showPlanned;
        this.props.fetchMonthBoard(newDate, showPlanned);
    }

    onShowPlanned = (event) => {
        this.props.fetchMonthBoard(this.props.selectedDate, !this.props.showPlanned);
    }

    isPastMonth = () => {
        const currentDate = new Date();
        return (this.props.selectedDate.getFullYear() <= currentDate.getFullYear()
            && this.props.selectedDate.getMonth() < currentDate.getMonth());
    }

    render () {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];

        return (
            <Container>
                <Grid stackable>
                    <Grid.Column width={16} textAlign="center">
                        <Label size="huge">
                            {monthNames[this.props.selectedDate.getMonth()]} {this.props.selectedDate.getFullYear()}
                        </Label>
                    </Grid.Column>
                </Grid>

                <Grid stackable>
                    <Responsive
                        {...Responsive.onlyMobile}
                        as={Grid.Column}
                        width={8} textAlign="center">
                        <Button.Group>
                            <Button labelPosition='left' icon='left chevron' content='Previous' onClick={this.onPreviousMonth}/>
                            <Button content='Current' onClick={this.onCurrentMonth}/>
                            <Button labelPosition='right' icon='right chevron' content='Next' onClick={this.onNextMonth}/>
                        </Button.Group>
                    </Responsive>
                    <Responsive
                        as={Grid.Column}
                        width={8}
                        minWidth={Responsive.onlyTablet.minWidth}>
                        <Button.Group>
                            <Button labelPosition='left' icon='left chevron' content='Previous' onClick={this.onPreviousMonth}/>
                            <Button content='Current' onClick={this.onCurrentMonth}/>
                            <Button labelPosition='right' icon='right chevron' content='Next' onClick={this.onNextMonth}/>
                        </Button.Group>
                    </Responsive>


                    <Responsive
                        {...Responsive.onlyMobile}
                        as={Grid.Column}
                        width={8} textAlign="center">
                        <Checkbox 
                            toggle 
                            label='Include planned operations' 
                            checked={this.props.showPlanned} 
                            onChange={this.onShowPlanned} 
                            disabled={this.isPastMonth()} />
                    </Responsive>
                    <Responsive
                        as={Grid.Column}
                        width={8} textAlign="right"
                        minWidth={Responsive.onlyTablet.minWidth}>
                        <Checkbox 
                            toggle 
                            label='Include planned operations' 
                            checked={this.props.showPlanned} 
                            onChange={this.onShowPlanned} 
                            disabled={this.isPastMonth()} />
                    </Responsive>

                </Grid>

                <Card.Group stackable itemsPerRow={4}>
                    <CardInfo value={this.props.statistic.icomes} label="Incomes" icon="chart line" />
                    <CardInfo value={this.props.statistic.expenses} label="Expenses" icon="money bill alternate outline" />
                    <CardInfo value={this.props.statistic.savings} label="Savings" icon="money bill alternate outline" />
                    <CardInfo value={this.props.statistic.creditCard} label="Credit card" icon="credit card outline" />
                </Card.Group>

                <Segment>
                    <Statistic.Group widths='two' size={"small"}>
                        <Statistic>
                            <Statistic.Value>
                                {this.props.statistic.totalBalance}
                            </Statistic.Value>
                            <Statistic.Label>
                                Total balance
                            </Statistic.Label>
                        </Statistic>
                        <Statistic>
                            <Statistic.Value>
                                {this.props.statistic.monthBalance}
                            </Statistic.Value>
                            <Statistic.Label>
                                Month balance
                            </Statistic.Label>
                        </Statistic>
                    </Statistic.Group>

                    <Table selectable celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell colSpan='3'>Expenses</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {this.props.statistic.categoryExpenses && 
                                this.props.statistic.categoryExpenses.map((expense) =>
                                    <Table.Row key={expense.category.id}>
                                        <Table.Cell collapsing>
                                            <Icon name={expense.category.icon} />
                                        </Table.Cell>
                                        <Table.Cell>{expense.category.name}</Table.Cell>
                                        <Table.Cell textAlign='right' collapsing>{expense.amount}</Table.Cell>
                                    </Table.Row>
                                )}
                        </Table.Body>
                    </Table>
                </Segment>
            </Container>
        );
    }
};

const mapStateToProps = state => {
    return { 
        statistic: state.stats.statistic,
        selectedDate: state.stats.selectedDate,
        showPlanned: state.stats.showPlanned
    };
  };
  
  export default connect(
    mapStateToProps,
    { fetchMonthBoard }
  )(MonthStatistics);