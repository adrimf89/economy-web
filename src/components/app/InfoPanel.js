import React from "react";
import { connect } from "react-redux";
import { Grid, Message } from "semantic-ui-react";
import { alertClear } from "../../actions/alertsAction";

class InfoPanel extends React.Component {
  componentDidMount() {
    this.props.alertClear();
  }

  render() {
    return (
      <Grid>
        <Grid.Column width={16}>
          {this.props.info && (
            <Message
              className={`${this.props.info.type}`}
              header={this.props.info.header}
              content={this.props.info.message}
            />
          )}
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    info: state.alerts.info
  };
};

export default connect(mapStateToProps, { alertClear })(InfoPanel);
