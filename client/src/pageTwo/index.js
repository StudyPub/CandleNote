import React from 'react';

export default class PageTwo extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render = () => (
    <div>
      <h1>Page Two!!</h1>
      <a href="/auth/logout">Logout</a>
    </div>
  );
}
