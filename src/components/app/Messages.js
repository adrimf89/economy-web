import React from "react";
import { Message, Icon } from "semantic-ui-react";

export const MessageLoading = ({ header, content }) => (
  <Message icon>
    <Icon name="circle notched" loading />
    <Message.Content>
      <Message.Header>{header}</Message.Header>
      {content}
    </Message.Content>
  </Message>
);

MessageLoading.defaultProps = {
  header: "Just one second",
  content: "We are fetching that content for you."
};

export const MessageError = ({ header, content }) => (
  <Message negative>
    <Message.Header>{header}</Message.Header>
    <p>{content}</p>
  </Message>
);

MessageError.defaultProps = {
  header: "Oops... an error occurred!",
  content: "Unexpected error occurred while fetching data."
};

export const MessageInfo = ({ header, content }) => (
  <Message info>
    <Message.Header>{header}</Message.Header>
    <p>{content}</p>
  </Message>
);

MessageInfo.defaultProps = {
  header: "Info",
  content: "Information message"
};
